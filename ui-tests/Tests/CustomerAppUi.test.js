import * as conf from '../Configs/conf';
import {setUpBrower, maximizeWindow, closeBrowser, accessWebsite} from '../Configs/setupBrowser';
import CustomerAppObject from '../Objects/CustomerAppObject';
import { exportAllDeclaration } from '@babel/types';



jest.setTimeout(conf.timeoutJest);



var browser;
var storeUrl = conf.environment;

beforeAll(() => {
    browser = setUpBrower();
});

afterAll(() => {
    
});

describe('Customer App Tests', function () {
    beforeAll(() => {
        maximizeWindow(browser);
        return accessWebsite(browser, storeUrl);
    });

    afterAll(() => { return closeBrowser(browser) });

    it('Check customer details', async (done) => {
        let customerAppObject = new CustomerAppObject(browser);
        await customerAppObject.typeName("Andre");
        await customerAppObject.clickOnSubmit();
        await customerAppObject.clickAndCheckEachCustomer();
        done();
    },conf.maxSafeTimeout)

    


});

