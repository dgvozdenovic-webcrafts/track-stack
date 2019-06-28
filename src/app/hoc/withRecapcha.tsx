import React from 'react'
import { ReCaptcha } from 'react-recaptcha-google'

export interface IWithRecapchaState {
    validCapcha: boolean,
}

export interface IWithRepachaProps {
    renderCapcha: () => React.ReactNode,
    validCapcha: boolean,
}

const withRecapcha = (siteKey: string) => (Component) => {
    class WithRecapcha extends React.Component<{}, IWithRecapchaState> {
        public captchaDemo: any

        constructor(props) {
            super(props)
            this.state = {
                validCapcha: false,
            }

            this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
            this.verifyCallback = this.verifyCallback.bind(this)
            this.renderCapcha = this.renderCapcha.bind(this)
        }

        public componentDidMount() {
            if (this.captchaDemo) {
                this.captchaDemo.reset()
            }
        }

        public onLoadRecaptcha() {
            if (this.captchaDemo) {
                this.captchaDemo.reset()
            }
            this.setState({
                validCapcha: false,
            })
        }

        public verifyCallback() {
            this.setState({
                validCapcha: true,
            })
        }

        public renderCapcha() {
            return (
                <ReCaptcha
                    ref={(el) => { this.captchaDemo = el }}
                    size='normal'
                    render='explicit'
                    sitekey={siteKey}
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                />
            )
        }

        public render() {
            const newProps: IWithRepachaProps = {
                renderCapcha: this.renderCapcha,
                validCapcha: this.state.validCapcha,
            }

            return (
                <Component {...newProps}{...this.props} />
            )
        }
    }

    return WithRecapcha
}

export default withRecapcha
