require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome')
var driver = require('selenium-webdriver');
require('chromedriver');
var conf= require('./conf');
require('selenium-webdriver/firefox');
require('geckodriver');

exports.setUpBrower = function () {
    var browser = conf.browserType || "headless";
    switch(browser){
        case "chrome":
            return setChromeLocal();
        case "headless":
            return setChromeHeadless();
        case "remote":
            return setChromeRemote();
        case "remoteHeadless":
            return setChromeHeadlessRemote();
        case "phantomjs":
            return setPhantomJs();
        case "ie":
            return setIeLocal();
        case "ff":
            return setFirefoxLocal();
        default:
            throw "Unexpected browser";
    }
}

function setPhantomJs() {
    var browser = new driver.Builder()
    .forBrowser('phantomjs')
    .build();  
    return browser;            
}

function setChromeHeadlessRemote() {
    const width = conf.width;
    const height = conf.height;

    var browser = new driver.Builder()
	.usingServer(conf.selenium_host)
	.forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            .headless()
            .addArguments("--no-sandbox")
            .addArguments("--disable-extensions")
            .windowSize({ width, height }))
    .build();
    return browser;            
}

function setChromeHeadless() {
    const width = conf.width;
    const height = conf.height;

    var browser = new driver.Builder()
	.forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            .headless()
            .windowSize({ width, height }))
    .build();
    return browser;            
}

function setIeLocal() { 
    var browser = new driver.Builder()
    .forBrowser('internet explorer')
    .build();  
    return browser;            
}

function setChromeLocal() {
    var browser = new driver.Builder()
    .forBrowser('chrome')
    .build();  
    return browser;            
}

function setChromeRemote() {
    var browser = new driver.Builder()
    .usingServer(conf.selenium_host)
    .forBrowser('chrome')
    .build();  
    return browser;            
}

function setFirefoxLocal() { 
    var browser = new driver.Builder()
    .forBrowser('firefox')
    .build();   
    return browser;            
}

exports.accessWebsite = async function (browser, url) {
    return await browser.get(url);
}

exports.closeBrowser = function (browser) {
    return browser.quit();          
}

exports.maximizeWindow = function (browser) {
    browser
    .manage()
    .window()
    .maximize()
}



