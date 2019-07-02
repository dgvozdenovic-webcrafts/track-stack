import {
    Button,
    Grid,
    InputAdornment,
    LinearProgress,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Tooltip,
    Typography,
    withStyles,
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import Router from 'next/router'
import React, { Component } from 'react'

import config from '../../const/config'
import * as routes from '../../const/routes'
import { auth, db } from '../../firebase'
import withRecapcha, { IWithRepachaProps } from '../../hoc/withRecapcha'
import {
    ratePassword,
    validateEmail,
} from '../../utilities/validation.util'
import * as styles from './signup.scss'

const FormatedButton = withStyles(() => ({
    root: {
        marginBottom: 8,
        marginTop: 32,
    },
}))(Button)

const FormatedInput = withStyles(() => ({
    root: {
        marginBottom: 0,
        marginTop: 8,
        width: 260,
    },
}))(TextField)

const FormatedStepper = withStyles(() => ({
    root: {
        marginTop: 24,
        padding: 0,
    },
}))(Stepper)

const BorderLinearProgress = withStyles({
    bar: (props) => ({
        backgroundColor: passwordColor[props.value],
        borderRadius: 4,
    }),
    root: {
        borderRadius: 4,
        height: 40,
        margin: '16px 0 8px 0',
    },
})(LinearProgress)

const passwordColor = {
    1: 'transparent',
    34: '#ffff00',
    67: '#eeff41',
    100: '#c6ff00',
}

const passwordStrengthLabels = {
    2: 'Medium',
    3: 'Strong',
    4: 'Very Strong',
}

const INITIAL_STATE: ISignupFormState = {
    activeStep: 0,
    email: '',
    error: null,
    passwordOne: '',
    passwordTwo: '',
    username: '',
}

interface ISignupFormState {
    activeStep: 0 | 1 | 2,
    email: string,
    error: any,
    passwordOne: string,
    passwordTwo: string
    username: string,
}

class Signup extends Component<{} & IWithRepachaProps, ISignupFormState> {

    public steps = [{
        content: () => {
            return this.renderUserDetailsFields()
        },
        label: 'User Details',
    }, {
        content: () => {
            return this.renderUserPasswordFields()
        },
        label: 'Username and Password',
    },
    {
        content: () => {
            return this.renderConfirmationFields()
        },
        label: 'Confirm',
    }]

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    public onSubmit = (event) => {
        const { username, email, passwordOne } = this.state

        auth
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                if (!authUser.user) {
                    return
                }

                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }))
                        Router.push(routes.HOME)
                    })
                    .catch((error) => {
                        this.setState({
                            error,
                        })
                    })
            })
            .catch((error) => {
                this.setState({
                    error,
                })
            })

        event.preventDefault()
    }

    public onUpdate(propName: keyof ISignupFormState) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            this.setState(updateState(propName, event.target.value))
    }

    public renderUserDetailsFields() {
        const { username } = this.state
        const isStepInvalid = this.state.username.length < 6

        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <FormatedInput
                        required={true}
                        value={username}
                        label='Username'
                        margin='normal'
                        placeholder='Full Name'
                        variant='outlined'
                        onChange={this.onUpdate('username')}
                    />
                </Grid>
                <Grid item >
                    <FormatedButton
                        disabled={isStepInvalid}
                        variant='contained'
                        color='primary'
                        type='button'
                        onClick={this.setStep(1)}
                    >
                        Next
                    </FormatedButton>
                </Grid>
            </React.Fragment>
        )
    }

    public renderUserPasswordFields() {
        const { email, passwordOne } = this.state
        const isEmailInvalid = !validateEmail(email)
        const passwordStrength = ratePassword(passwordOne)
        const isStepInvalid = passwordStrength === 1 || isEmailInvalid

        return (
            <React.Fragment>
                <Grid item>
                    <FormatedInput
                        error={email !== '' && isEmailInvalid}
                        autoComplete='username'
                        required={true}
                        value={email}
                        label='Email Address'
                        margin='normal'
                        placeholder='Enter email'
                        variant='outlined'
                        onChange={this.onUpdate('email')}
                    />
                </Grid>
                <Grid item >
                    <FormatedInput
                        error={passwordStrength === 1}
                        autoComplete='current-password'
                        required={true}
                        value={passwordOne}
                        label='Password'
                        margin='normal'
                        placeholder='Enter password'
                        variant='outlined'
                        type='password'
                        onChange={this.onUpdate('passwordOne')}
                        InputProps={{
                            endAdornment: (
                                passwordStrength === 1 ? <InputAdornment position='end'>
                                    <Tooltip
                                        placement='left'
                                        title={
                                            <React.Fragment>
                                                <Typography color='error'>Invalid Password</Typography>
                                                <p>
                                                    1. Password must contain at least six characters or more.
                                                        <br />
                                                    {`2. Password must have at least one lowercase and one
                                                        uppercase alphabetical
                                                        character or at least one numberic character`}
                                                </p>
                                            </React.Fragment>
                                        }
                                    >
                                        <ErrorIcon color='error' />
                                    </Tooltip>

                                </InputAdornment> : null
                            ),
                        }}
                    />
                </Grid>
                <Grid item className={styles.passwordWrapper}>
                    <BorderLinearProgress
                        variant='determinate'
                        color='primary'
                        value={(passwordStrength - 1) * 33 + 1}
                    />
                    <div className={styles.passwordStrengthLabel}>
                        <Typography color='primary'>{passwordStrengthLabels[passwordStrength]}</Typography>
                    </div>
                </Grid>
                <Grid container >
                    <FormatedButton
                        variant='outlined'
                        color='primary'
                        type='button'
                        onClick={this.setStep(0)}
                        className={styles.backButton}
                    >
                        Back
                    </FormatedButton>
                    <FormatedButton
                        disabled={isStepInvalid}
                        variant='contained'
                        color='primary'
                        type='button'
                        onClick={this.setStep(2)}
                    >
                        Next
                    </FormatedButton>
                </Grid>
            </React.Fragment>
        )
    }

    public renderConfirmationFields() {
        const { error, email, passwordTwo, passwordOne } = this.state
        const { validCapcha } = this.props
        const isInvalid = !validCapcha || passwordTwo === '' || email === ''
        const passwordError = passwordTwo !== '' && passwordTwo !== passwordOne

        return (
            <React.Fragment>
                <Grid item >
                    <FormatedInput
                        error={passwordError}
                        autoComplete='current-password'
                        required={true}
                        value={passwordTwo}
                        label='Confirm Password'
                        margin='normal'
                        placeholder='Enter password'
                        variant='outlined'
                        type='password'
                        onChange={this.onUpdate('passwordTwo')}
                        InputProps={{
                            endAdornment: (
                                passwordError ? <InputAdornment position='end'>
                                    <Tooltip
                                        placement='left'
                                        title={
                                            <React.Fragment>
                                                <Typography color='error'>Invalid Password</Typography>
                                                <p>
                                                    Passwords do not match.
                                                </p>
                                            </React.Fragment>
                                        }
                                    >
                                        <ErrorIcon color='error' />
                                    </Tooltip>

                                </InputAdornment> : null
                            ),
                        }}
                    />
                </Grid>
                <Grid item className={styles.recaptcha}>
                    {this.props.renderCapcha()}
                </Grid>
                <Grid item >
                    <FormatedButton
                        variant='outlined'
                        color='primary'
                        type='button'
                        onClick={this.setStep(1)}
                        className={styles.backButton}
                    >
                        Back
                    </FormatedButton>
                    <FormatedButton
                        disabled={isInvalid}
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Sign Up
                    </FormatedButton>
                </Grid>
                <Grid item >
                    {error && <p>{error.message}</p>}
                </Grid>
            </React.Fragment>
        )
    }

    public render() {
        const { activeStep } = this.state

        return (
            <form className={styles.wrapper} onSubmit={this.onSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography className={styles.title} variant='h5'>
                            Account Sign Up:
                        </Typography>
                    </Grid>
                    <FormatedStepper activeStep={activeStep} orientation='vertical'>
                        {this.steps.map((step) => (
                            <Step key={step.label}>
                                <StepLabel>
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    {step.content()}
                                </StepContent>
                            </Step>
                        ))}
                    </FormatedStepper>
                </Grid>
            </form>
        )
    }

    private setStep = (step: ISignupFormState['activeStep']) => () => {
        this.setState({
            activeStep: step,
        })
    }
}

const updateState = <T extends string>(key: keyof ISignupFormState, value: T) => (
    prevState: ISignupFormState,
): ISignupFormState => ({
    ...prevState,
    [key]: value,
})

export default withRecapcha(config.recapcha.siteKey)(Signup)
