const { expect } = require('@playwright/test');
const { Log4jsLogger } = require('../config/log4jsLogger');
const { ActionHelper } = require('./actionHelper');


exports.TableHelper = class TableHelper {
    constructor(page) {
        this.page = page;

        this.log = new Log4jsLogger();

        this.helper = new ActionHelper(page);

        this.headerSelector = "//th";
    }

    // The method can be used to validate list of expected elements to contain corresponding values
    async validateTableHeader(tableName, expectedHeaderNameList, tableSelector, headerSelector = this.headerSelector = "//th") {

        let headerElements = await this.helper.findElements("Headers", tableSelector + headerSelector);

        await this.helper.e_compareCountOfElements("Header count", tableSelector + headerSelector, expectedHeaderNameList.length);

        this.log.info("Validating number of headers for " + tableName);

        for (var i = 0; i < expectedHeaderNameList.length; i++) {
            await this.helper.e_elementToContainText("Header " + (i + 1), headerElements[i], expectedHeaderNameList[i]);
        }

    }
}
