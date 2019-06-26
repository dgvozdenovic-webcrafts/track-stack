import React from 'react'
import * as styles from '../styles/main.scss'

import { AppWithAuthentication } from '../components/App'
import LandingForm from '../components/landing-form/landing-form'

const LandingPage = () => (
  <AppWithAuthentication>
    <h1 className={styles.pageTitle}>Landing</h1>
    <p>
      The Landing Page is open to everyone, even though the user isn't signed
      in.
    </p>
    <LandingForm />
  </AppWithAuthentication>
)
export default LandingPage
