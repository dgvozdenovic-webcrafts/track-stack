import Link from 'next/link'
import Router from 'next/router'
import React, { Component } from 'react'

import { AppWithAuthentication } from '../components/App'
import * as routes from '../const/routes'
import { auth, db } from '../firebase'

const SignUpPage = () => (
    <AppWithAuthentication>
        <h1>SignUp</h1>
        <SignUpForm />
    </AppWithAuthentication>
)

// TODO: Move this in to a helper for reuse
const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

const INITIAL_STATE: ISignUpFormState = {
    email: '',
    error: null,
    passwordOne: '',
    passwordTwo: '',
    username: '',
}

interface ISignUpFormState {
    email: string,
    error: any,
    passwordOne: string,
    passwordTwo: string
    username: string,
}

class SignUpForm extends Component<{}, ISignUpFormState> {
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
                        this.setState(updateByPropertyName('error', error))
                    })
            })
            .catch((error) => {
                this.setState(updateByPropertyName('error', error))
            })

        event.preventDefault()
    }

    public onUpdate(propName: keyof ISignUpFormState) {
        return (event) =>
            this.setState(updateByPropertyName(propName, event.target.value))
    }

    public render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' || username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={username}
                    onChange={this.onUpdate('username')}
                    type='text'
                    placeholder='Full Name'
                />
                <input
                    value={email}
                    onChange={this.onUpdate('email')}
                    type='text'
                    placeholder='Email Address'
                />
                <input
                    value={passwordOne}
                    onChange={this.onUpdate('passwordOne')}
                    type='password'
                    placeholder='Password'
                />
                <input
                    value={passwordTwo}
                    onChange={this.onUpdate('passwordTwo')}
                    type='password'
                    placeholder='Confirm Password'
                />
                <button disabled={isInvalid} type='submit'>
                    Sign Up
        </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account?{' '}
        <Link href={routes.SIGN_UP}>
            <a>Sign Up</a>
        </Link>
    </p>
)
export default SignUpPage
export { SignUpForm, SignUpLink }
