import { App } from "@src/app/app"
import { RoutePath } from "@src/router/routes"
import status from "statuses"
import supertest from "supertest"
import { describe, expect, test } from "vitest"

describe("GET to Index route", () => {
    test("should set up a redirect to the Health route", async () => {
        const app = new App("development", 3_000)
        const response = await supertest(app.run()).get(RoutePath.INDEX)

        expect(response.redirect).toEqual(true)
        expect(response.status).toEqual(status.code["found"])
        expect(response.headers["location"]).toEqual(RoutePath.HEALTH)
    })

    test("should return a plain text", async () => {
        const app = new App("development", 3_000)
        const response = await supertest(app.run()).get(RoutePath.INDEX)

        expect(response.headers["content-type"]).toMatch(/text\/plain/)
    })
})

describe("GET to Health route", () => {
    test("should return the json", async () => {
        const app = new App("development", 3_000)
        const response = await supertest(app.run()).get(RoutePath.HEALTH)

        expect(response.status).toEqual(status.code["ok"])
        expect(response.body["status"]).toEqual("Ok")
    })
})
