import type { Express } from "express"

import { logger } from "@src/logger/logger"
import { RoutePath } from "@src/router/routes"
import express from "express"

class App {
    private app: Express
    private mode: "development" | "production"
    private port: number

    constructor(
        mode: "development" | "production" | undefined,
        port: number | undefined
    ) {
        const DEFAULT_PORT = 3_000

        this.app = express()
        this.mode = mode ?? "development"
        this.port = port ?? DEFAULT_PORT
    }

    public run() {
        this.app.get(RoutePath.INDEX, (_, res) =>
            res.redirect(RoutePath.HEALTH)
        )

        this.app.get(RoutePath.HEALTH, (_, res) =>
            res.send({
                status: "Ok",
                timestamp: new Date().getUTCMilliseconds()
            })
        )

        switch (this.mode) {
            case "production": {
                this.app.listen(this.port, () =>
                    logger.info(
                        `Server is running at http://localhost:${this.port}/`
                    )
                )

                break
            }
            default: {
                logger.info("You are in development mode!")

                this.app.listen(this.port, () =>
                    logger.info(
                        `Server is running at http://localhost:${this.port}/`
                    )
                )
            }
        }

        return this.app
    }
}

export { App }
