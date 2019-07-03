
import React from 'react'

import { AppWithAuthentication } from '../components/App'
import LandingForm from '../components/landing-form/landing-form'
import { PasswordForgetLink } from './pw-forget'

const SignInPage = () => (
    <AppWithAuthentication>
        <h1>SignIn</h1>
        <LandingForm />
        <PasswordForgetLink />
    </AppWithAuthentication>
)

export default SignInPage
