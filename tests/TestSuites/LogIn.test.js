const { test } = require('@playwright/test');
const { LogInPage } = require('../../pages/LogInPage.js');
const { SignupPage } = require('../../pages/SignupPage'); 
const { Log4jsLogger } = require('../../config/log4jsLogger');
const { TTD } = require('../../config/testTagDefinition');
const { signupTD } = require('../../resources/test-data/TestData/signupTD');
const { LogInTD } = require('../../resources/test-data/TestData/LogInTD.js');

test.describe('Run all tests as defined.', () => {
    let page, context, LogIn, signup,  logger;
  

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        LogIn = new LogInPage(page);
        signup = new SignupPage(page)
        logger = new Log4jsLogger();
        logger.startFeature('Run Logn and Search feature test');
     //   LogInTD = new LogInTD();
        await LogIn.loadWebSite(LogInTD.url);
        await LogIn.logInToWebsite(LogInTD.username, LogInTD.password);
    });

    test.afterAll(async ({ browser }) => {
        
        logger.endFeature('End Login and Search Feature Test');
    });  


    test('Log In with the given credentials'+  TTD.smokeTest, async () => {
        await LogIn.verifyHomeLogo();
    });

    test("Sign Up Functionality" + TTD.smokeTest, async()=>{
        await signup.loadSignupPage(signupTD.signupurl);
        await signup.signUpFunctionality(signupTD.companyname, signupTD.sitename, signupTD.email, signupTD.fullname, signupTD.password, signupTD.reenter_password)
    });

    
});
