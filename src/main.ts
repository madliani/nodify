import process from "node:process"

import { App } from "./app/app"
import { logger } from "./logger/logger"

function main(): void {
    const { NODE_ENV, PORT } = process.env

    const app = new App(NODE_ENV, PORT)

    app.run()
}

try {
    main()
} catch (err) {
    logger.error(err)

    process.exitCode = 1
}
