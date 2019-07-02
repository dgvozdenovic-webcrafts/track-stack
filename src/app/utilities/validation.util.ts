const validateEmail = (email: string): boolean =>
    // tslint:disable-next-line
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(String(email).toLowerCase())

/**
 * @param password string password to be validated
 * @returns 1 for invalid, 2 for medium, 3 for strong, 4 for extremly strong
 */
const ratePassword = (password: string): 0 | 1 | 2 | 3 | 4 => {
    // tslint:disable-next-line
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    const extremeRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})')

    return extremeRegex.test(password) ? 4
        : strongRegex.test(password) ? 3
            : mediumRegex.test(password) ? 2
                : password ? 1 : 0
}

export {
    validateEmail,
    ratePassword,
}
