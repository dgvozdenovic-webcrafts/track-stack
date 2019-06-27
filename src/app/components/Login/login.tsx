import {
    Button,
    Grid,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core'
import Router from 'next/router'
import React, { Component } from 'react'
import { ReCaptcha } from 'react-recaptcha-google'

import * as routes from '../../const/routes'
import config from '../../const/config'
import { auth } from '../../firebase'
import * as styles from './login.scss'

const FormatedButton = withStyles(() => ({
    root: {
        marginBottom: '8px',
        marginTop: '72px',
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

class Login extends Component<{}, ISignInFormState> {

    captchaDemo: any

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }

        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    public componentDidMount() {
        if (this.captchaDemo) {
            console.log('started, just a second...')
            this.captchaDemo.reset();
        }
    }

    public onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
        this.setState({
            validCapcha: false
        })
    }
    public verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, '<= your recaptcha token')
        this.setState({
            validCapcha: true
        })
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
        const { validCapcha, email, password, error } = this.state
        const isInvalid = !validCapcha || password === '' || email === ''

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
                    <Grid item xs={12}>
                        <FormatedInput
                            autoComplete='current-password'
                            required={true}
                            value={password}
                            label='Password'
                            margin='normal'
                            placeholder='Enter password'
                            variant='outlined'
                            type='password'
                            onChange={this.onUpdate('password')}
                        />
                    </Grid>
                    <Grid item xs={12} className={styles.recaptcha}>
                        <ReCaptcha
                            ref={(el) => { this.captchaDemo = el; }}
                            size='normal'
                            render='explicit'
                            sitekey={config.recapcha.siteKey}
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />
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

export default Login
