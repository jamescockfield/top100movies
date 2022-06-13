import { applicationConfig } from "./config/applicationConfig";
import { App } from "./App";

const app = App.getApp();

app.listen(applicationConfig.EXPRESS_PORT, () => {
    console.log(`Listening on ${applicationConfig.EXPRESS_PORT}`);
});
