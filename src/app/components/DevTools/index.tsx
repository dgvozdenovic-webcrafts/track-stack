import DevTools from '../../utilities/react-dev-tools'

const ReduxDevTools = () => {
    if (process.env.NODE_ENV === 'development') {
        return <DevTools />
    }
    return null
}

export default ReduxDevTools
