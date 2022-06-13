import { Config } from "@jest/types";

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 60000,
} as Config.InitialOptions;
