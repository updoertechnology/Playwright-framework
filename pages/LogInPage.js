//-------------------------------------------------------------------------
const { ActionHelper } = require('../utility/actionHelper');

exports.LogInPage = class LogInPage {
    
    constructor(page) {
        this.page = page;
        this.helper = new ActionHelper(this.page);
        this.inputEmailId = "//input[@id='email']";
        this.inputPassword = "//input[@id='password']";
        this.logInButton = "//button[@id='sign-in']";
        this.home_logoSelector = "//i[@id='helpIcon']"
    }


    async loadWebSite(url) {
        await this.helper.navigateToUrl(url);
    }


    async enterUserName(username) {
        await this.helper.sendText("UserName", this.inputEmailId, username);
    }

    async enterPassword(password) {
        await this.helper.sendPassword("Password", this.inputPassword, password);       // Enter password value passed from calling routine
    }

    async clickLogin() {
        await this.helper.click("Login Button", this.logInButton);                // Click on Login Button to login to Worklife site
    }

    async verifyHomeLogo() {
        await this.helper.e_toBeVisible("Home Page Logo", this.home_logoSelector);     // Verify that Home Page Logo is visible
    }

    async logInToWebsite(username, password) {
         // await this.loadWebSite(url);
          await this.enterUserName(username);
          await this.enterPassword(password);
          await this.clickLogin();
    }

}
