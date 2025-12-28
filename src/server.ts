import { Config } from './config'
import app from './app'
import logger from './config/logger'

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

startServer().then((_) => {
    console.log(_)
})
