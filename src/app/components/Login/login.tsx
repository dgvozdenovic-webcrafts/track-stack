import Router from 'next/router'
import React, { Component } from 'react'

import { Paper } from '@material-ui/core'
import * as routes from '../../const/routes'
import { auth } from '../../firebase'
import * as styles from './login.scss'

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
        return (event) =>
            this.setState(updateByPropertyName(propName, event.target.value))
    }

    public render() {
        const { email, password, error } = this.state

        const isInvalid = password === '' || email === ''

        return (
            <Paper className={styles.wrapper}>

                <form onSubmit={this.onSubmit}>
                    <input
                        value={email}
                        onChange={this.onUpdate('email')}
                        type='text'
                        placeholder='Email Address'
                    />
                    <input
                        value={password}
                        onChange={this.onUpdate('password')}
                        type='password'
                        placeholder='Password'
                    />
                    <button disabled={isInvalid} type='submit'>
                        Sign In
        </button>

                    {error && <p>{error.message}</p>}
                </form>
            </Paper>
        )
    }
}

const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

export default Login
