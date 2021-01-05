const errorLogger = (error, message) => {
    console.log(`\n\n // ERROR // \n\n ${message} \n\n ${error.message}`)
}

export default errorLogger;