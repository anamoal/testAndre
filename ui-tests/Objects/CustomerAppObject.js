import { By, until } from 'selenium-webdriver';
import BaseObject from './baseObject';


const inputName = By.css('#name');
const btnSubmit = By.css('[value="Submit"]');
const btnBackToList = By.css('[value="Back to the list"]');
const linkCustomer = By.xpath('//a');
const labelCustomerDetails = By.xpath('//*[contains(text(),"Customer Details")]');

export default class CustomerAppObject extends BaseObject {

  constructor(browser) {
    super(browser);
  }

  async typeName(name) {
    await this.typeWhenVisible(inputName, name)
  }

  async clickOnSubmit() {
    
    await this.clickWhenVisible(btnSubmit)
    await this.sleepBrowser(1000);
  }

  async clickAndCheckEachCustomer() {
    
    let links = await this.getElements(linkCustomer)  

    for (let index = 0; index < links.length; index++) {
      let links = await this.getElements(linkCustomer);
      let elementText = links[index].getText();
      await links[index].click();
      await this.sleepBrowser(1000);
      var pageIsOk = await this.checkElementisPresent(labelCustomerDetails);
      if (!pageIsOk) {
        console.log('Customer with index '+index+' is returning error!');
        expect(pageIsOk).toBe(true);
      }
      await this.clickWhenVisible(btnBackToList);
      await this.sleepBrowser(1000);

    }

  }

  

}
