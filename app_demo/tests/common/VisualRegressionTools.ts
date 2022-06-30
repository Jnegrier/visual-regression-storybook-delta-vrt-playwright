import { expect } from "@playwright/test";
import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright";


class VisualRegressionTools {
    vrt: any;

    constructor(test: any) {
        const config = {
            apiUrl: "http://localhost:4200",
            branchName: process.env.BRANCH_NAME || "master",
            project: "00ff974c-5ac2-4a63-bd81-73603f2704b4",
            apiKey: "785ZFZ90DB4SY6GJ0VC91A10EKXW",
            enableSoftAssert: true,
            ciBuildId: process.env.GITHUB_SHA || new Date().getTime().toString(36),
          };
          this.vrt = new PlaywrightVisualRegressionTracker(test.info().project.name, config);

          return this;
    }

    async checkPage(page: any, name: string, tolerance: number) {
        let check = await this.vrt.trackPage(page, name, {diffTollerancePercent: tolerance, screenshotOptions: {fullPage: true}});
        const url = check.testRunResponse.url.replace("127.0.0.1:8080", "localhost:8080");
        if(check.testRunResponse.status === 'new'){
          console.warn("## There is no baseline for this check, please set it on the link below:");
          console.warn(url);
        } else {
          const error_message = `Visual difference for ${name} is too high, please check sample on: ${url}`
          expect(check.testRunResponse.status === "ok", error_message).toBeTruthy()
        }
      }

      async checkElement(element: any, name: string, tolerance: number) {
        let check = await this.vrt.trackElementHandle(element, name, {diffTollerancePercent: tolerance});
        const url = check.testRunResponse.url.replace("127.0.0.1:8080", "localhost:8080");
        if(check.testRunResponse.status === 'new'){
          console.warn("## There is no baseline for this check, please set it on the link below:");
          console.warn(url);
        } else {
          const error_message = `Visual difference for ${name} is too high, please check sample on: ${url}`
          expect(check.testRunResponse.status === "ok", error_message).toBeTruthy()
        }
      }

      async startVRT(){
        await this.vrt.start();
      }

      async stopVRT(){
        await this.vrt.stop();
      }

}

export { VisualRegressionTools };
