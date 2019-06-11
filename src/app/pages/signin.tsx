import Router from 'next/router'
import React, { Component } from 'react'

import { AppWithAuthentication } from '../components/App'
import * as routes from '../const/routes'
import { auth } from '../firebase'
import { PasswordForgetLink } from './pw-forget'
import { SignUpLink } from './signup'

const SignInPage = () => (
    <AppWithAuthentication>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </AppWithAuthentication>
)

// TODO: Move this in to a helper for reuse
const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

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

class SignInForm extends Component<{}, ISignInFormState> {
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
        )
    }
}

export default SignInPage

export { SignInForm }
