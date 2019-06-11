import React, { Component } from 'react'

import { auth } from '../../firebase'

const updateByPropertyName: (propertyName: string, value: any) => () => any =
    (propertyName: string, value: any) => () => ({
        [propertyName]: value,
    })

const INITIAL_STATE = {
    error: null,
    passwordOne: '',
    passwordTwo: '',
}

interface IPasswordChangeFormState {
    passwordOne: string,
    passwordTwo: string,
    error: any,
}

class PasswordChangeForm extends Component<{}, IPasswordChangeFormState> {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    public onSubmit = (event) => {
        const { passwordOne } = this.state

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }))
            })
            .catch((error) => {
                this.setState(updateByPropertyName('error', error))
            })

        event.preventDefault()
    }

    public onUpdatePasswordOne = (event) => {
        this.setState(updateByPropertyName('passwordOne', event.target.value))
    }

    public onUpdatePasswordTwo = (event) => {
        this.setState(updateByPropertyName('passwordTwo', event.target.value))
    }

    public render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={passwordOne}
                    onChange={this.onUpdatePasswordOne}
                    type='password'
                    placeholder='New Password'
                />
                <input
                    value={passwordTwo}
                    onChange={this.onUpdatePasswordTwo}
                    type='password'
                    placeholder='Confirm New Password'
                />
                <button disabled={isInvalid} type='submit'>
                    Reset My Password
        </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

export default PasswordChangeForm
