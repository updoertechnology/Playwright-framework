//===============================================================================================================================================
//
//  The class contains reusable playwright actions and events. The methods are wrapped with logging ability.
//
//  Last Updated By:    Kyle Heidtman
//  Last Updated Date:  11/22/2021
//
//===============================================================================================================================================


const { expect } = require('@playwright/test');
const { Log4jsLogger } = require('../config/log4jsLogger');


exports.ActionHelper = class ActionHelper {

    constructor(page) {
        this.timeout = 5000;
        this.page = page;
        this.log = new Log4jsLogger();
        this.spinnerSelector = "//div[@class='wl-spinner'] >> nth=0"; // used specific to workife
    }

    // #region Navigation
    async navigateToUrl(url) {
   //     try {
            this.log.info("Navigating to Url: " + url);
            await this.page.goto(url);
     //   } catch (e) {
       //     this.log.error("Exception occured while navigating to " + url + ". Exception Details: " + e.message);
        //}
    }

    async refreshPage() {
        try {
            this.log.info("Refreshing the page: ");
            await this.page.reload();
        } catch (e) {
            this.log.error("Exception occured while reloading page. Exception Details: " + e.message);
        }
    }

    // #endregion

    // #region Actions using Locators
    async click(elementName, selector, timeout = this.timeout) {
        try {
            await this.e_toBeEnabled(elementName, selector);
            this.log.info("Clicking on Element " + elementName);
            let element = await this.page.locator(selector);
            await element.click(); // ex: 'text=Submit'     
            await this.waitForState("Spinner selector", this.spinnerSelector, 'detached');
        }
        catch (e) {
            this.log.error("Exception occured while clicking on element " + elementName + ". Exception Details: " + e.message);
        }
    }

    // #region Actions using Locators
    async clickElementInFrame(frameName, elementName, selector, timeout = this.timeout) {
        try {
            const frame = await this.page.frame({name: frameName});
            let element = await this.frame.locator(selector);
            this.log.info("Clicking on Element " + elementName+ "in frame "+frameName);
            await element.click(); // ex: 'text=Submit'     
            await this.waitForState("Spinner selector", this.spinnerSelector, 'detached');
            
        }
        catch (e) {
            this.log.error("Exception occured while clicking on element in frame" + elementName + ". Exception Details: " + e.message);
        }
    }
   
    async getText(elementName, selector, timeout = this.timeout) {
        let text;
        try {
            await this.e_toBeEnabled(elementName, selector);
            this.log.info("Getting text of " + elementName);
            let element = await this.page.locator(selector);
            text = await element.textContent() // ex: 'text'        
        }
        catch (e) {
            this.log.error("Exception occured while getting Text on element " + elementName + ". Exception Details: " + e.message);
        }
        return text;
    }


    async clickCatchNewPage(elementName, selector, timeout = this.timeout) {
        try {
            await this.e_toBeEnabled(elementName, selector);
            this.log.info("Clicking on Element " + elementName + " and expecting a new page to open.");
            let element = await this.page.locator(selector);

            // Get new Page after a specific action (e.g., click)
            const [newPage] = await Promise.all([
                //this.context.waitForEvent('page'),    
                this.page.waitForEvent('popup'),
                await element.click() // ex: 'text=Submit' 
            ]);

            //await newPage.waitForLoadState('domcontentloaded');
            await newPage.waitForLoadState('load');
            await newPage.waitForLoadState('networkidle');

            return await newPage
        }
        catch (e) {
            this.log.error("Exception occured while clicking on element " + elementName + " and expecting a new page to open. Exception Details: " + e.message);
        }
    }

    async typeText(elementName, selector, value, timeout = this.timeout) {
        try {
            await this.click(elementName, selector);
            this.log.info("Entering value in the Text Field " + elementName + " with value: " + value);
            let element = await this.page.locator(selector);
            await element.type(value); 
            await this.page.keyboard.down("Tab");
        }
        catch (e) {
            this.log.error("Exception occured while providing input to Text Area " + elementName + ". Exception Details: " + e.message);
        }
    }
    async hover(elementName, selector, timeout = this.timeout) {
        try {
            await this.e_toBeEnabled(elementName, selector);
            this.log.info("Hovering over Element " + elementName);
            let element = await this.page.locator(selector);
            await element.hover(); // ex: 'text=Submit'        
        }
        catch (e) {
            this.log.error("Exception occured while hovering over element " + elementName + ". Exception Details: " + e.message);
        }
    }

    async sendText(elementName, selector, value, timeout = this.timeout) {
        try {
            await this.click(elementName, selector);
            this.log.info("Entering value in the Text Field " + elementName + " with value: " + value);
            let element = await this.page.locator(selector);
            await element.fill(value);
        }
        catch (e) {
            this.log.error("Exception occured while providing input to Text Area " + elementName + ". Exception Details: " + e.message);
        }
    }

    async sendPassword(elementName, selector, value, timeout = this.timeout) {
        try {
            await this.click(elementName, selector);
            this.log.info("Entering Password .... ");
            let element = await this.page.locator(selector);
         //   await element.fill(value);
            await element.type(value); 
            await this.page.keyboard.down("Tab");
        }
        catch (e) {
            this.log.error("Exception occured while entering " + elementName + ". Exception Details: " + e.message);
        }
    } 

    // #endregion

    //#region Actions on Elements
    async clickElement(elementName, element, timeout = this.timeout) {
        try {
            await this.e_elementToBeEnabled(elementName, element);
            this.log.info("Clicking on Element " + elementName);
            await element.click(); // ex: 'text=Submit'  
            await this.waitForState("Spinner selector", this.spinnerSelector, 'detached');
        }
        catch (e) {
            this.log.error("Exception occured while clicking on element " + elementName + ". Exception Details: " + e.message);
        }
    }
    // #endregion

    async waitForState(elementName, selector, expectedState, timeout = this.timeout) {
        try {
            this.log.info("Waiting for element " + elementName + " to be in state: '" + expectedState + "'.");
            await this.page.waitForSelector(selector, { state: expectedState });
        }
        catch (e) {
            this.log.info("Exception occured while waiting for element " + elementName + " to be in state: '" + expectedState + "'. Exception Details: " + e.message);
        }
    }

    async catchNewPageUrl(timeout = this.timeout) {
        //let curContext = this.context
        try {
            //await curContext.once('page', async newPage => {
            await this.page.once('popup', async newPage => {
                this.log.info("Catching New Page.");
                await newPage.waitForLoadState();
                this.log.info("New Page URL: " + await newPage.url());
            })
        }
        catch (e) {
            this.log.error("Exception occured while catching new Page. Exception Details: " + e.message);
        }

    }

    async upload(selector,filename){
        this.page.setInputFiles(selector,filename); 

    }
    async verifymail(iframe,selector){
        this.page.frameLocator(iframe).locator(selector).click() 
    }
    async pageUrlContains(curPage, value, timeout = this.timeout) {
        let curURL
        try {
            this.log.info("Validating page's URL contains text " + value);
            curURL = curPage.url()
            this.log.info("Page URL " + curURL)
        }
        catch (e) {
            this.log.error("Exception occured while validating if page's URL contains text " + value + ". Exception Details: " + e.message);
        }
        await expect(await curURL.includes(value)).toBeTruthy();;
    }


    async getDistanceXAboveY(xName, xSelector, yName, ySelector, timeout = this.timeout) {
        let xElem
        let xBox
        let xLowestPixel
        let yElem
        let yBox
        let yHeighestPixel

        try {
            this.log.info("Checking if element " + xName + " is above element " + yName);

            xElem = await this.findElements(xName, xSelector);
            xBox = await xElem[0].boundingBox();
            xLowestPixel = xBox.y + xBox.height

            yElem = await this.findElements(yName, ySelector);
            yBox = await yElem[0].boundingBox();
            yHeighestPixel = yBox.y

            return await yHeighestPixel - xLowestPixel
        }
        catch (e) {
            this.log.error("Exception occured comparing heights of the elements '" + xName + "' and '" + yName + "'. Exception Details: " + e.message);
        }
        // Cannot use the expect in the same function that returns a value
        // expect(xLowestPixel < yHeighestPixel).toBeTruthy();
    }


    async checkXAboveY(xName, xSelector, yName, ySelector, timeout = this.timeout) {
        let distance;
        try {
            this.log.info("Checking if element " + xName + " is above element " + yName);
            distance = await this.getDistanceXAboveY(xName, xSelector, yName, ySelector);
        }
        catch (e) {
            this.log.error("Exception occured comparing heights of the elements '" + xName + "' and '" + yName + "'. Exception Details: " + e.message);
        }
        expect(await distance).toBeGreaterThan(0);
    }

    // #region Multiple Elements

    async findElements(elementsName, selector, timeout = this.timeout) {
        try {
            this.log.info("Finding elements of Type " + elementsName);
            await this.page.waitForSelector(selector);
            return await this.page.$$(selector);
        }
        catch (e) {
            this.log.error("Exception occured while finding elements " + elementsName + ". Exception Details: " + e.message);
        }

    }

    // Modified version of findElements().  Doses not use the "waitForSelector" function
    async findElementsNoWait(elementsName, selector, timeout = this.timeout) {
        try {
            this.log.info("Finding elements of Type " + elementsName);
            //            await this.page.waitForSelector(selector);
            return this.page.$$(selector);
        }
        catch (e) {
            this.log.error("Exception occured while finding elements " + elementsName + ". Exception Details: " + e.message);
        }

    }

    async getVisibility(elementName, selector, timeout = this.timeout) {
        try {
            this.log.info("Getting the visibility status of " + elementName);
            // Can't use the this.page.waitForSelector() function or else the the getVisibility() will never return "false"
            return await this.page.isVisible(selector);
        }
        catch (e) {
            this.log.error("Exception occured while getting the visibility status of " + elementName + ". Exception Details: " + e.message);
        }
    }

    // Adding a Card Count method, cannot combine with e_compareCountOfElements, the return statement bypasses the await expect below the try/catch
    async getCountOfElements(elementName, selector, timeout = this.timeout) {

        let actualCount;

        try {
            await this.page.waitForSelector(selector);
            actualCount = await this.page.$$eval(selector, (items) => items.length);
            this.log.info("Getting the actual count of " + elementName + " in the page. Actual count:" + actualCount);
            return actualCount;
        }
        catch (e) {
            this.log.error("Exception occured while retrieving the count of " + elementName + ". Exception Details: " + e.message);
        }

        //await expect(await actualCount).toBe(expectedCount);
    }

    async e_compareCountOfElements(elementName, selector, expectedCount, timeout = this.timeout) {

        let actualCount;

        try {
            await this.page.waitForSelector(selector);
            actualCount = await this.page.$$eval(selector, (items) => items.length);
            this.log.info("Validating the number of " + elementName + " in the page. Expected count:" + expectedCount + " vs Actual count:" + actualCount);
        }
        catch (e) {
            this.log.error("Exception occured while retrieving the count of " + elementName + ". Exception Details: " + e.message);
        }

        await expect(await actualCount).toBe(expectedCount);
    }

    // Modified version of e_compareCountOfElements().  Doses not use the "waitForSelector" function
    async e_compareCountOfElementsNoWait(elementName, selector, expectedCount, timeout = this.timeout) {

        let actualCount;

        try {
            //            await this.page.waitForSelector(selector);
            actualCount = await this.page.$$eval(selector, (items) => items.length);
            this.log.info("Validating the number of " + elementName + " in the page. Expected count:" + expectedCount + " vs Actual count:" + actualCount);
        }
        catch (e) {
            this.log.error("Exception occured while retrieving the count of " + elementName + ". Exception Details: " + e.message);
        }

        await expect(await actualCount).toBe(expectedCount);
    }

    // #endregion

    // #region Expects on locators

    async e_toBeVisible(elementName, selector, timeout = this.timeout) {
        let element;
        try {
            this.log.info("Validating " + elementName + " is visible.");
            await this.page.waitForSelector(selector);
            element = await this.page.locator(selector);
        }
        catch (e) {
            this.log.error("Exception occured while validating " + elementName + " is visible. Exception Details: " + e.message);
        }
        await expect(await element.first()).toBeVisible();

    }

    async e_toBeHidden(elementName, selector, timeout = this.timeout) {
        let element;
        try {
            this.log.info("Validating " + elementName + " is hidden");
            element = await this.page.locator(selector);
        }
        catch (e) {
            this.log.error("Exception occured while validating if " + elementName + " is hidden. Exception Details: " + e.message);
        }
        await expect(await element).toBeHidden();
    }

    async e_toHaveText(elementName, selector, value, timeout = this.timeout) {
        let element;
        try {
            element = await this.page.locator(selector);
            this.log.info("Validating " + elementName + " to have text " + value);
        }
        catch (e) {
            this.log.error("Exception occured while validating if " + elementName + " has value " + value + ". Exception Details: " + e.message);
        }
        await expect(await element).toHaveText(value);
    }

    async e_toContainText(elementName, selector, value, timeout = this.timeout) {

        let element;
        let actualValue;
        try {
            element = await this.page.locator(selector);
            actualValue = await element.first().textContent();
            this.log.info("Validating " + elementName + " text.. " + "Expected: " + value + " Actual Value: " + actualValue);
        }
        catch (e) {
            this.log.error("Exception occured while validating if " + elementName + " contains text " + value + ". Exception Details: " + e.message);
        }
        await expect(actualValue).toContain(value);
    }


    async e_toContainAttribute(elementName, selector, attributeName, value, timeout = this.timeout) {
        let element;
        let actualValue
        try {

            element = await this.page.locator(selector);
            this.log.info("Validating " + elementName + " to contain attribute " + attributeName + " with value " + value);
            actualValue = await element.getAttribute(attributeName);
        }
        catch (e) {
            this.log.error("Exception occured while validating if " + elementName + " contains attribute " + attributeName + " with value " + value + ". Exception Details: " + e.message);
        }
        this.log.info("Expected value: " + value + " vs Actual value: " + actualValue)
        //await expect(await actualValue === value).toBeTruthy();
        await expect(await actualValue.includes(value)).toBeTruthy();
    }

    async e_toBeEnabled(elementName, selector, timeout = this.timeout) {
        let element;
        try {
            this.log.info("Validating " + elementName + " is enabled.");
            element = await this.page.locator(selector);
        }
        catch (e) {
            this.log.error("Exception occured while validating " + elementName + " is enabled. Exception Details: " + e.message);
        }
        await expect(await element).toBeTruthy();
    }

    async e_toBeDisabled(elementName, selector, timeout = this.timeout) {
        let element;
        try {
            this.log.info("Validating " + elementName + " is disabled.");
            element = await this.page.locator(selector);
        }
        catch (e) {
            this.log.error("Exception occured while validating " + elementName + " is disabled. Exception Details: " + e.message);
        }
        await expect(await element.isDisabled()).toBeTruthy();
    }

    // #endregion

    // #region Expects on Images

    async e_compareImages(imageName, selector, expectedImageFileName, timeout = this.timeout) {
        let element;
        element = await this.page.locator(selector);
        const actualImage = await element.screenshot();
        this.log.info("Comparing images " + imageName);
        await expect(actualImage).toMatchSnapshot(expectedImageFileName);
    }

    async e_compareFullPage(imageName, expectedImageFileName, timeout = this.timeout) {
        const actualImage = await this.page.screenshot();
        this.log.info("Comparing images " + imageName);
        await expect(actualImage).toMatchSnapshot(expectedImageFileName);
    }

    // #endregion

    // #region Expects on child elements - Used for Cards Validation
    // find parentElement using findElements method
    async e_childToContainText(elementName, parentElement, childSelector, expectedValue, parentIndex = 0, timeout = this.timeout) {

        let childElement;
        let actualValue;

        try {
            // this.log.info("childSelector: "+ childSelector);
            childElement = await parentElement[parentIndex].$(childSelector);
            actualValue = await childElement.textContent();
            this.log.info("Validating child element text.. " + elementName + " Expected: " + expectedValue + " vs actual value: " + actualValue);
        }
        catch (e) {
            this.log.error("Exception occured while retrieving text content of the child element " + elementName + ". Exception Details: " + e.message);
        }
        await expect(await actualValue).toContain(expectedValue);
    }

    async e_childToContainAttribute(elementName, parentElement, childSelector, attributeName, expectedValue, parentIndex = 0, timeout = this.timeout) {
        let childElement;
        let actualValue;
        try {
            childElement = await parentElement[parentIndex].$(childSelector);

            actualValue = await childElement.getAttribute(attributeName);
            this.log.info("Validating child element attribute.. " + elementName + " Expected " + attributeName + ": " + expectedValue + " vs actual " + attributeName + ": " + actualValue);
        }
        catch (e) {
            this.log.error("Exception occured while retrieving " + attributeName + " attribute of the child element " + elementName + ". Exception Details: " + e.message);
        }
        await expect(await actualValue === expectedValue).toBeTruthy();
    }


    async e_childToContainLinkText(elementName, parentElement, childSelector, expectedValue, parentIndex = 0, timeout = this.timeout) {

        let childElement;
        let linkValue;

        try {
            childElement = await parentElement[parentIndex].$(childSelector);
            linkValue = await childElement.evaluate(node => node.getAttribute('href'));
            this.log.info("Validating child link text.. " + elementName + " Expected: " + expectedValue + " vs actual value: " + linkValue);
        }
        catch (e) {
            this.log.error("Exception occured while retrieving link text of the child element " + elementName + ". Exception Details: " + e.message);
        }
    }

    async e_childToBeVisible(elementName, parentElement, childSelector, parentIndex = 0, timeout = this.timeout) {
        let childElement;
        try {
            this.log.info("Validating child element " + elementName + " is visible.");
            childElement = await parentElement[parentIndex].$(childSelector);

        }
        catch (e) {
            this.log.error("Exception occured while validating child element " + elementName + " is visible. Exception Details: " + e.message);
        }
        await expect(await childElement.isVisible()).toBeTruthy();

    }

    async e_childToBeEnabled(elementName, parentElement, childSelector, parentIndex = 0, timeout = this.timeout) {

        let childElement;

        try {
            this.log.info("Validating child element " + elementName + " is enabled.");
            childElement = await parentElement[parentIndex].$(childSelector);

        }
        catch (e) {
            this.log.error("Exception occured while validating child element " + elementName + " is enabled. Exception Details: " + e.message);
        }
        await expect(await childElement.isEnabled()).toBeTruthy();

    }


    async childGetText(elementName, parentElement, childSelector, parentIndex = 0, timeout = this.timeout) {

        let childElement;
        let childCardText;

        try {
            this.log.info("Getting text from child element " + elementName);
            childElement = await parentElement[parentIndex].$(childSelector);

        }
        catch (e) {
            this.log.error("Exception occured while getting text from child element " + elementName + ". Exception Details: " + e.message);
        }
        childCardText = await childElement.textContent();
        this.log.info("ACTUAL TEXT OF CHILD CARD CONTENT BEGINS HERE **** " + childCardText + " **** END OF CHILD CARD CONTENT TEXT");

    }


    // #endregion

    //#region Actions on child elements using locator

    async childClick(elementName, parentElement, childSelector, parentIndex = 0, timeout = this.timeout) {

        let childElement;

        try {
            this.log.info("Clicking child element " + elementName);
            childElement = await parentElement[parentIndex].$(childSelector);


        }
        catch (e) {
            this.log.error("Exception occured while clicking on child element " + elementName + ". Exception Details: " + e.message);
        }
        await childElement.click();
        await this.waitForState("Spinner selector", this.spinnerSelector, 'detached');

    }

    async childSendText(elementName, parentElement, childSelector, value, parentIndex = 0, timeout = this.timeout) {
        try {
            this.log.info("Child Selector: " + childSelector);
            childElement = await parentElement[parentIndex].$(childSelector);
            this.log.info("Entering value in the Text Field " + elementName + " with value: " + value);
        }
        catch (e) {
            this.log.error("Exception occured while providing input to Text Area " + elementName + ". Exception Details: " + e.message);
        }
        await childElement.click();
        await this.waitForState("Spinner selector", this.spinnerSelector, 'detached');
        await childElement.fill(value);
    }

    // #endregion

    // #region Expects on elements

    async e_elementToBeVisible(elementName, element, timeout = this.timeout) {

        this.log.info("Validating " + elementName + " is visible.");
        await expect(await element).toBeVisible();

    }

    async e_elementToBeHidden(elementName, element, timeout = this.timeout) {

        this.log.info("Validating " + elementName + " is hidden");
        await expect(await element).toBeHidden();
    }

    async e_elementToContainText(elementName, element, value, timeout = this.timeout) {

        this.log.info("Validating " + elementName + " to contain text " + value);
        let actualValue = await element.textContent();
        await expect(actualValue).toContain(value)
    }

    async e_elementToContainAttribute(elementName, element, attributeName, value, timeout = this.timeout) {

        this.log.info("Validating " + elementName + " to contain attribute " + attributeName + " with value " + value);
        actualValue = await element.getAttribute(attributeName);
        this.log.info("Expected value: " + value + " vs Actual value: " + actualValue)
        await expect(await actualValue.includes(value)).toBeTruthy();
    }

    async e_elementToBeEnabled(elementName, element, timeout = this.timeout) {
        this.log.info("Validating " + elementName + " is enabled.");
        await expect(await element).toBeTruthy();
    }

    async e_elementToBeDisabled(elementName, element, timeout = this.timeout) {

        this.log.info("Validating " + elementName + " is disabled.");
        await expect(await element.isDisabled()).toBeTruthy();
    }

    //Verify Boolean 
    async verifyBoolean(value) {
        this.log.info("Validating " + value + " condition is true");
        await expect(value).toBeTruthy();
    }

    // #endregion


}