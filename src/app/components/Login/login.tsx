import {
    Button,
    Grid,
    InputAdornment,
    LinearProgress,
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
import { auth } from '../../firebase'
import withRecapcha, { IWithRepachaProps } from '../../hoc/withRecapcha'
import * as styles from './login.scss'

const FormatedButton = withStyles(() => ({
    root: {
        marginBottom: '8px',
        marginTop: '32px',
    },
}))(Button)

const FormatedInput = withStyles(() => ({
    root: {
        marginBottom: '0',
        marginTop: '8px',
        width: '260px',
    },
}))(TextField)

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

const INITIAL_STATE: ISignInFormState = {
    email: '',
    error: null,
    password: '',
    validCapcha: false,
}

interface ISignInFormState {
    email: string,
    error: any,
    password: string,
    validCapcha: boolean,
}

class Login extends Component<{} & IWithRepachaProps, ISignInFormState> {

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    public onSubmit = (event) => {
        const { email, password } = this.state

        auth
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }))
                Router.push(routes.HOME)
            })
            .catch((error) => {
                this.setState(updateByPropertyName('error', error))
            })

        event.preventDefault()
    }

    public onUpdate(propName: keyof ISignInFormState) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            this.setState(updateByPropertyName(propName, event.target.value))
    }

    public render() {
        const { email, password, error } = this.state
        const { validCapcha } = this.props
        const isEmailInvalid = email !== '' && !validateEmail(email)
        const isInvalid = !validCapcha || password === '' || email === ''
        const passwordStrength = ratePassword(password)

        return (

            <form className={styles.wrapper} onSubmit={this.onSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography className={styles.title} variant='h5'>
                            Account Log In:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormatedInput
                            error={isEmailInvalid}
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
                    <Grid item xs={12} className={styles.passwordWrapper}>
                        <FormatedInput
                            error={passwordStrength === 1}
                            autoComplete='current-password'
                            required={true}
                            value={password}
                            label='Password'
                            margin='normal'
                            placeholder='Enter password'
                            variant='outlined'
                            type='password'
                            onChange={this.onUpdate('password')}
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
                        <BorderLinearProgress
                            variant='determinate'
                            color='primary'
                            value={(passwordStrength - 1) * 33 + 1}
                        />
                        <div className={styles.passwordStrengthLabel}>
                            <Typography color='primary'>{passwordStrengthLabels[passwordStrength]}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} className={styles.recaptcha}>
                        {this.props.renderCapcha()}
                    </Grid>
                    <Grid item xs={12}>
                        <FormatedButton
                            disabled={isInvalid}
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Sign Up
                        </FormatedButton>
                    </Grid>
                    <Grid item xs={12}>
                        {error && <p>{error.message}</p>}
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

const validateEmail = (email: string): boolean =>
    // tslint:disable-next-line
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(String(email).toLowerCase())

/**
 * @param password string password to be validated
 * @returns 1 for invalid, 2 for medium, 3 for strong, 4 for extremly strong
 */
const ratePassword = (password: string): 0 | 1 | 2 | 3 | 4 => {
    // tslint:disable-next-line
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    const extremeRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})')

    return extremeRegex.test(password) ? 4
        : strongRegex.test(password) ? 3
            : mediumRegex.test(password) ? 2
                : password ? 1 : 0
}

export default withRecapcha(config.recapcha.siteKey)(Login)
