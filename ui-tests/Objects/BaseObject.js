import {By, until} from 'selenium-webdriver';
import util from 'util';
import fs from 'fs';
import * as conf from '../Configs/conf';
import {Condition} from 'selenium-webdriver/lib/webdriver';

export default class BaseObject {
    constructor(browser) {
        this.browser = browser;
    }

	async clickWhenVisible( locator ) {
        return await this.browser.wait(until.elementLocated(locator), conf.timeoutFindElements,
        `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be present`)
          .then(element => {
             return this.browser.wait(until.elementIsVisible(element), conf.timeoutFindElements,
             `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be present`);
          })
          .then(()=> this.browser.findElement( locator ).click());
	}

    async typeWhenVisible(locator,text) {
        return await this.browser.wait(until.elementLocated(locator), conf.timeoutFindElements,'Element not located with locator:'+locator)
          .then(element => {
             return this.browser.wait(until.elementIsVisible(element), conf.timeoutFindElements,
             `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible`);
          })
          .then(()=> this.browser.sleep(500))
          .then(()=> this.browser.findElement( locator ).clear())
          .then(()=> this.browser.sleep(500))
          .then(()=> this.browser.findElement( locator ).sendKeys(text));
    }

    async clickWhenPresent(locator) {
        return await this.browser.wait(() => {
             return this.browser.findElements(locator).then((elements) => {
                return elements.length > 0;
             });
         }, conf.timeoutFindElements, 'The element was still present when it should have disappeared. locator: '+locator)
         .then(()=>this.browser.findElement( locator ).click());
     }

     async typeWhenPresent(locator,text) {
        return await this.browser.wait(() => {
            return this.browser.findElements(locator).then((elements) => {
                return elements.length > 0;
        });
        }, conf.timeoutFindElements, 'The element is not present. locator: '+locator)
        .then(()=> this.browser.sleep(500))
        .then(()=> this.browser.findElement( locator ).clear())
        .then(()=> this.browser.sleep(500))
        .then(()=> this.browser.findElement( locator ).sendKeys(text));
    }

    async waitUntilElementisNotPresent(locator) {
       return await this.browser.wait(() => {
            return this.browser.findElements(locator).then((elements) => {
                return elements.length <= 0;
            });
        }, conf.timeoutFindElements, 'The element was still present when it should have disappeared. locator: '+locator);
    }

    async waitUntilElementisPresent(locator) {
        return await this.browser.wait(() => {
            return this.browser.findElements(locator).then((elements) => {
                return elements.length > 0;
        });
        }, conf.timeoutFindElements, 'The element is not present. locator: '+locator);
    }
 
    async checkElementisNotPresent(locator) {
        var webElements = await this.browser.findElements(locator);
        return await webElements.then(function (elements) {
            return elements.length==0;
        });
    }

    async checkElementisPresent(locator) {
        var webElements = await this.browser.findElements(locator);
       
            return webElements.length>0;
        
    }

    async waitUntilElementIsNotVisible( locator ) {
		return await this.browser.wait( until.elementIsNotVisible(
			this.browser.findElement( locator ) ), conf.timeoutFindElements,
			`Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
    }
    
    async waitUntilElementIsVisible(locator) {
        return await this.browser.wait(until.elementLocated(locator), conf.timeoutFindElements)
          .then(element => {
             return this.browser.wait(until.elementIsVisible(element), conf.timeoutFindElements,
             `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible`);
          });
    }
    
    async getElementText(locator) {
        await this.browser.wait( until.elementIsVisible(
			this.browser.findElement( locator ) ), conf.timeoutFindElements,
            `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
        let element = await this.browser.findElement( locator );
        element.getText();
        return await element.getText();
    }

    async getElementText(locator) {
        await this.browser.wait( until.elementIsVisible(
			this.browser.findElement( locator ) ), conf.timeoutFindElements,
            `Timed out waiting for the element with ${locator.using} of '${locator.value}' to be visible` );
        let element = await this.browser.findElement( locator );
        element.getText();
        return await element.getText();
    }

    async getText(element) {
        return await element.getText();
    }

    async getElements(locator) {
        var webElements = await this.browser.findElements(locator);
        return await webElements;
    }

    async  writeTextFile(file,text) {
        await fs.writeFile(file, text, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
    }

    async takeScreenshot(file){
        return await this.browser.takeScreenshot()
            .then(image => fs.writefileSync(file, image, 'base64'))
    }

    async  sleepBrowser(time) {
        return await this.browser.sleep(time);
    }

    async  clickOnElement(element) {
        return await element.click();
    }


}


