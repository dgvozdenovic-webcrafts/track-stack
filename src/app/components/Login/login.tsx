import {
    Button,
    Grid,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    withStyles,
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import Router from 'next/router'
import React, { Component } from 'react'
import { compose } from 'redux'

import config from '../../const/config'
import * as routes from '../../const/routes'
import { auth } from '../../firebase'
import withRecapcha, { IWithRepachaProps } from '../../hoc/withRecapcha'
import withSnackbarActions, { IWithSnackbarActionsProps } from '../../hoc/withSnackbarActions'
import {
    ratePassword,
    validateEmail,
} from '../../utilities/validation.util'
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

class Login extends Component<{} & IWithRepachaProps & IWithSnackbarActionsProps, ISignInFormState> {

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
                this.props.openSnackbar(
                    {
                        autohide: 3000,
                        message: error.message,
                        variant: 'error',
                    },
                )
                this.setState(updateState('error', error))
            })

        event.preventDefault()
    }

    public onUpdate(propName: keyof ISignInFormState) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            this.setState(updateState(propName, event.target.value))
    }

    public render() {
        const { email, password } = this.state
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
                </Grid>
            </form>
        )
    }
}

const updateState = <T extends string>(key: keyof ISignInFormState, value: T) => (
    prevState: ISignInFormState,
): ISignInFormState => ({
    ...prevState,
    [key]: value,
})

export default compose(
    withRecapcha(config.recapcha.siteKey),
    withSnackbarActions(),
)(Login)
