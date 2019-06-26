import {
    Button,
    Grid,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core'
import Router from 'next/router'
import React, { Component } from 'react'

import * as routes from '../../const/routes'
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
}

interface ISignInFormState {
    email: string,
    error: any,
    password: string,
}

class Login extends Component<{}, ISignInFormState> {
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

        const isInvalid = password === '' || email === ''

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
                            required={true}
                            value={email}
                            id='outlined-required'
                            label='Email Address'
                            margin='normal'
                            placeholder='Enter email'
                            variant='outlined'
                            onChange={this.onUpdate('email')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormatedInput
                            required={true}
                            value={password}
                            id='outlined-required'
                            label='Password'
                            margin='normal'
                            placeholder='Enter password'
                            variant='outlined'
                            type='password'
                            onChange={this.onUpdate('password')}
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
