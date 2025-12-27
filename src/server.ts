import { Config } from './config/index.js'
import app from './app.js'
import logger from './config/logger.js'

const startServer = async () => {
    try {
        const port = Config.PORT
        app.listen(port, () => {
            logger.info('Server started on port', { port })
        })
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

startServer()
