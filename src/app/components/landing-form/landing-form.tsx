import {
    Button,
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core'
import React, { PureComponent, ReactElement } from 'react'

import Login from '../Login/login'
import Signup from '../Signup/signup'
import * as styles from './landing-form.scss'

interface IState {
    sliderMoved: boolean
}

const ColorButton = withStyles(() => ({
    root: {
        borderColor: '#fff',
        color: '#fff',
    },
}))(Button)

export default class LandingForm extends PureComponent<{}, IState> {

    constructor(props) {
        super(props)

        this.state = {
            sliderMoved: false,
        }

        this.toggleSlide = this.toggleSlide.bind(this)
    }

    public renderSide(
        title: string,
        details: string,
        CustomButton: ReactElement,
    ) {
        return (
            <React.Fragment>
                <Typography className={styles.title} variant='h5'>
                    {title}
                </Typography>
                <Typography className={styles.description}>
                    {details}
                </Typography>
                {CustomButton}
            </ React.Fragment>
        )
    }

    public toggleSlide(): void {
        const { sliderMoved } = this.state

        this.setState({
            sliderMoved: !sliderMoved,
        })
    }

    public renderSignUpInfo() {
        const title = 'Need an account?'
        const description = `Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua. At imperdiet
          dui accumsan sit amet nulla. Fringilla ut morbi tincidunt augue interdum.
           Amet nulla facilisi morbi tempus iaculis. Sed sed risus pretium quam vulputate dignissim suspendisse in.`
        const button: ReactElement = (
            <ColorButton
                variant='outlined'
                color='secondary'
                onClick={this.toggleSlide}
            >
                Sign Up
            </ColorButton>
        )
        return this.renderSide(title, description, button)
    }

    public renderLoginInfo() {
        const title = 'Already have an account?'
        const description = `Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua. At imperdiet
          dui accumsan sit amet nulla. Fringilla ut morbi tincidunt augue interdum.
           Amet nulla facilisi morbi tempus iaculis. Sed sed risus pretium quam vulputate dignissim suspendisse in.`
        const button: ReactElement = (
            <ColorButton
                variant='outlined'
                color='secondary'
                onClick={this.toggleSlide}
            >
                Log In
            </ColorButton>
        )
        return this.renderSide(title, description, button)
    }

    public render() {

        const { sliderMoved } = this.state

        return (
            <Paper className={styles.paper}>
                <div className={styles.side}>
                    {this.renderSignUpInfo()}
                </div>
                <div className={styles.side}>
                    {this.renderLoginInfo()}
                </div>
                <Paper className={`${styles.slide} ${sliderMoved ? styles.left : styles.right}`}>
                    {sliderMoved ? <Signup /> : <Login />}
                </Paper>
            </Paper>
        )
    }
}
