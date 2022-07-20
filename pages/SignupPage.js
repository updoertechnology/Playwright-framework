//---------------------------------------------------
const { async } = require('node-stream-zip');
const { ActionHelper } = require('../utility/actionHelper');

exports.SignupPage = class SignupPage {
  
    constructor(page) {
        this.page = page;
        this.helper = new ActionHelper(this.page);
        this.companynamefield = 'input[id="company"]'
        this.sitenamefield = 'input[id="sitename"]'
        this.emailfield = "input[id='email']";
        this.namefield = 'input[id="name"]'
        this.passwordfield = "input[id='password']";
        this.reenterpasswordfield = 'input[id="password_confirmation"]'
        this.signupbtn = "button[id='sign-up']";
    }

    async loadSignupPage(signupurl) {
        await this.helper.navigateToUrl(signupurl);
    }
    async entercompanyname(company){
        await this.helper.sendText("Company Name", this.companynamefield, company)
    }
    async entersitename(sitename){
        await this.helper.sendText("Site Name", this.sitenamefield, sitename)
    }
    async enteremail(email){
      //  await page.waitFor(2000);
        await this.helper.sendText("Email", this.emailfield, email)
    }
    async entername(fullname){
        await this.helper.sendText("Full Name", this.namefield, fullname)
    }
    async enterpassword(password){
        await this.helper.sendText("Password", this.passwordfield, password)
    }
    async enterrepassword(reenter_password){
        await this.helper.sendText("Repassword", this.reenterpasswordfield, reenter_password)
    }
    async clickonsignupbtn(){
        await this.helper.click("Signup button", this.signupbtn, 6000)
    }

    async signUpFunctionality(companyname,sitename,email,fullname,password,reenter_password){
     //   await this.loadSignupPage(signupurl)
        await this.entercompanyname(companyname)
        await this.entersitename(sitename)
        await this.enteremail(email)
        await this.entername(fullname)
        await this.enterpassword(password)
        await this.enterrepassword(reenter_password)
        await this.clickonsignupbtn()
    }

}