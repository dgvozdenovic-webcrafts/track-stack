
import React from 'react'

import { AppWithAuthentication } from '../components/App'
import Login from '../components/Login/login'
import { PasswordForgetLink } from './pw-forget'
import { SignUpLink } from './signup'

const SignInPage = () => (
    <AppWithAuthentication>
        <h1>SignIn</h1>
        <Login />
        <PasswordForgetLink />
        <SignUpLink />
    </AppWithAuthentication>
)

export default SignInPage
