exports.Log4jsLogger = class Log4jsLogger {

    constructor() {
        this.log4jsParam = require('log4js');
        let fileName = './config/log4jsconfig.json';
        this.log4jsParam.configure(fileName);

        this.infoLog = this.log4jsParam.getLogger();
        this.errorLog = this.log4jsParam.getLogger("error");
    }

    debug(message) {
        this.infoLog.debug(message);
    }
    info(message) {
        this.infoLog.info(message);
    }
    warn(message) {
        this.infoLog.warn(message);
    }
    error(message) {
        this.infoLog.error(message);
        this.errorLog.error(message);
    }
    fatal(message) {
        this.infoLog.fatal(message);
        this.errorLog.fatal(message);
    }

    startFeature(featureName) {
        this.infoLog.info("****************** Started Excecuting Tests related to feature: " + featureName + "******************");
    }

    endFeature(featureName) {
        this.infoLog.info("****************** Completed Executing Tests related to feature: " + featureName + " ******************");
    }

    startTest(testName) {
        this.infoLog.info("****************** Started Excecuting Test : " + testName + " ******************");

    }

    endTest(testName) {
        this.infoLog.info("****************** Completed Executing Tests: " + testName + " ******************");

    }

}

