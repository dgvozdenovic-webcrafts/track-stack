import {
    blue,
    cyan,
    red,
} from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#fff',
        },
        error: {
            main: red.A400,
        },
        primary: blue,
        secondary: cyan,
    },
})

export default theme
