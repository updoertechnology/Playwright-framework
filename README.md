# Introduction 
This project is just the demonstration of playwroght automation for application. As discussed by Client we have tried to create a framework using playwright and java script combination. In this demo project we have created 2 tests just to demonstrate the process

# Getting Started
INSTALLATION In order to run this project please follow below instructions:
1.	1.	Create a new Windows Folder wherever you want to store your local rep
2.	Start VS Code (if the 1st time you will get a blank project with the following screen.  If you have used VS Code before, it will open you last project and you will need to use File>New Window to get a Start window …
3.  Open the folder created in Step #1 from VS Code …
4.	Open a new Terminal Window from VS Code …
5.	Run > npm init in the Terminal just opened in Step #4 (this will create the package.json file which is required to do local npm installs in your new project) …
6.	Run > npm i -D @playwright/test (should install and create node_modules folder in local project folder)
7.	Run npx playwright install (installs all browser related dependencies)
8.	Run npm install (will pickup all the dependencies in the package.json file) …
9.	Run npm i -D allure-playwright
10.	Install Allure by unzipping the following file to a folder on your local PC
https://github.com/allure-framework/allure2/releases/download/2.15.0/allure-2.15.0.zip
11. Now add the location of the Allure binary to the System PATH environment variable …

Playwright Usage/Tips
First Method: Using individual test file run
1.	Run tests by entering the command > npx playwright test in the terminal (the 1st test you run in a session will take longer since it has to load all the browser dependencies.  Subsequent tests run faster).  You should see it return “1 passed (xs) where x is the number of seconds it took to run
2.	Can define browsers at runtime via the “–browser=firefox” flag or –browser=all
3.	Default is to run “headless” (i.e. you will NOT see the browser open when it runs).  To run where you CAN see the browser open, and the test go through all of its steps, use the “—headed” flag

Second Method: Using Tag annotation
1. Each test can be tagged with any particular tagname(for ex: I have added smokeTest for both test cases)
2. Define the tag Defination in package.json file under script section as below:
"scripts": {
    "smokeTest": "set ALLURE_RESULTS_DIR=testResults/allure-results/smoke&& npx playwright test tests/TestSuites --grep @smoke --headed",
    "allureReportSmoke": "allure generate testResults/allure-results/smoke testResults/allure-report/smoke && allure open testResults/allure-report/smoke"
  },
3. Now in order to run the smoke Test just write command "npm run smokeTest" in the terminal
4. In order to generate allure report write command "npm run allureReportSmoke"
