import request from "supertest";
import { Express } from "express";

import { App } from "../../../src/application/App";

describe("app.ts integration test", () => {

    let app: Express;
    const aladdinId = 812;

    beforeAll(() => {
        app = App.getApp();
    });

    it("should get movie data", async () => {
        const response = await request(app).get(`/movie/${aladdinId}`);
        expect(response.body.title).toBe("Aladdin");
    });
});
