// playwright.config.js
// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
let log;
const config = {
  globalSetup: require.resolve('./config/globalsetup'),
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: 'tests',
  //grep: /@wlJobPostingsPage/,

  // Each test is given 30 seconds
  timeout: 90000,
  globalTimeout: 1000000,
  reporter: [ ['junit', { outputFile: 'testResults/results.xml' }],['line'],['allure-playwright']],

  // Forbid test.only on CI
  //forbidOnly: !!process.env.CI,

  // Two retries for each test
  //retries: 2,
 // reporter: 'allure-playwright', // Including allure playwright reporter in config file disables logs being printed on Terminal/ Console
  // Limit the number of workers on CI, use default locally
  //workers: process.env.CI ? 2 : undefined,  
  use: {
    // Configure browser and context here

    // viewport:  null ,
    viewport: { width: 1366, height: 768 }, // 1366 x 768
    screenshot: "on",
    trace: "on",
    headless: true,    
  },

  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },
  retries: 0
};

module.exports = config;