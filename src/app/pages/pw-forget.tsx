import Link from 'next/link'
import React, { Component } from 'react'

import { AppWithAuthentication } from '../components/App'
import * as routes from '../const/routes'
import { auth } from '../firebase'

const PasswordForgetPage = () => (
    <AppWithAuthentication>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </AppWithAuthentication>
)

// TODO: Move this in to a helper for reuse
const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

const INITIAL_STATE = {
    email: '',
    error: null,
}

interface IPasswordForgetFormState {
    email: string,
    error: any,
}

class PasswordForgetForm extends Component<{}, IPasswordForgetFormState> {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    public onSubmit = (event) => {
        const { email } = this.state

        auth
            .doPasswordReset(email)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }))
            })
            .catch((error) => {
                this.setState(updateByPropertyName('error', error))
            })

        event.preventDefault()
    }

    public onUpdate(propName: keyof IPasswordForgetFormState) {
        return (event) =>
            this.setState(updateByPropertyName(propName, event.target.value))
    }

    public render() {
        const { email, error } = this.state

        const isInvalid = email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={this.state.email}
                    onChange={this.onUpdate('email')}
                    type='text'
                    placeholder='Email Address'
                />
                <button disabled={isInvalid} type='submit'>
                    Reset My Password
        </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link href={routes.PASSWORD_FORGET}>
            <a>Forgot Password?</a>
        </Link>
    </p>
)

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }
