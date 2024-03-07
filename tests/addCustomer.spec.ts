import { test, expect } from '@playwright/test';
import {loginTest, resultFirstname, resultCity, envEmail, envAccNo, resultCustomerSel} from './utilities'; //import the utilities file

const allSelectors = {
    //Add Customer Selectors
    customerBtn: 'a#CustomersNavbarItem > .m-menu__link-text',
    createNewCst: '#CreateNewCustomerButton',
    nameInput: '#Name',
    inputAccountNo: '#AccountNumber',
    inputAddress: "input[name='BillingAddress1']",
    addressCheckbox: 'div:nth-of-type(5) > .m-checkbox > span',
    inputInvoiceEmail: '#InvoiceEmail',
    deliveryMethod: 'span#select2-PreferredDeliveryMethod-container',
    termsDropdown: 'span#select2-Terms-container',
    saveBtn: '.save-button',
    toastMessage: '.toast-message',

    //Edit Customer Selectors
    ellipsisBtn: resultCustomerSel,
    editBtn: "[x-placement] [title='Edit']",
    activeCheckbox: 'div:nth-of-type(10) > .m-checkbox > span',

    //Add Contact Selectors
    addContactBtn: '#CreateNewCustomerContactButton',
    conName: '.modal-md #Name',
    conTitle: '#Title',
    conNum: '#PhoneNumber',
    conEmail: '#Email',
    conSaveBtn: '.modal-md .save-button',

    //Filter Option Selectors
    searchName: 'input#NameFilter',
    statusOp: 'span#select2-StatusFilter-container',
    searchBtn: '#SearchButton',
};

test.describe('Customer Page', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Add New Customer', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Customers page
        await page.click(allSelectors.customerBtn);
        await page.waitForTimeout(3000);
        await page.click(allSelectors.createNewCst);
        await page.waitForTimeout(3000);

        //Add Customer Modal
        await page.type(allSelectors.nameInput, resultFirstname);
        await page.type(allSelectors.inputAccountNo, envAccNo);
        await page.type(allSelectors.inputAddress, resultCity);
        await page.waitForTimeout(3000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.click(allSelectors.addressCheckbox);

        await page.type(allSelectors.inputInvoiceEmail, envEmail);

        //Address
        await page.click(allSelectors.deliveryMethod);
        for (let index = 0; index < 1; index++) {
            await page.keyboard.press("ArrowDown");        
        }
        await page.keyboard.press('Enter');

        //Generate random value 1-7
        let randomValue = Math.floor(Math.random() * 7) + 1;
        //For drop-down value getting randomly
        await page.click(allSelectors.termsDropdown);
        for (let i = 0; i < randomValue; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.click(allSelectors.saveBtn);
        await page.waitForSelector(allSelectors.toastMessage, {timeout: 5000});
        await expect(page.locator(allSelectors.toastMessage)).toHaveText("Saved successfully.");
    });

    test('Edit Customer', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Customer page
        await page.click(allSelectors.customerBtn);
        await page.waitForTimeout(3000);

        await page.click(allSelectors.ellipsisBtn);
        await page.click(allSelectors.editBtn);

        //Edit Customer Modal
        await page.waitForTimeout(3000);
        await page.type(allSelectors.nameInput, 'Edit ');
        await page.fill(allSelectors.inputAccountNo, envAccNo);
        await page.fill(allSelectors.inputAddress, resultCity);
        await page.waitForTimeout(3000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await page.type(allSelectors.inputInvoiceEmail, envEmail);

        //Address
        await page.click(allSelectors.deliveryMethod);
        for (let index = 0; index < 1; index++) {
            await page.keyboard.press("ArrowDown");        
        }
        await page.keyboard.press('Enter');

        //Generate random value 1-7
        let randomValue = Math.floor(Math.random() * 7) + 1;
        //For drop-down value getting randomly
        await page.click(allSelectors.termsDropdown);
        for (let i = 0; i < randomValue; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.click(allSelectors.activeCheckbox);
        
        await page.click(allSelectors.saveBtn);
        await page.waitForSelector(allSelectors.toastMessage, {timeout: 5000});
        await expect(page.locator(allSelectors.toastMessage)).toHaveText("Saved successfully.");
    });

    test('Add Contact on Customer', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Customer page
        await page.click(allSelectors.customerBtn);
        await page.waitForTimeout(3000);

        await page.click(allSelectors.ellipsisBtn);
        await page.click(allSelectors.editBtn);

        await page.click(allSelectors.addContactBtn);
        await page.type(allSelectors.conName, resultFirstname);
        await page.type(allSelectors.conTitle, 'Mr.');
        await page.fill(allSelectors.conNum, '09123091212');
        await page.type(allSelectors.conEmail, envEmail);

        await page.waitForTimeout(5000);

        await page.click(allSelectors.conSaveBtn);

    });

    test('Testing Search Bar & Status', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        //Add Customer
        await page.click(allSelectors.customerBtn);
        await page.waitForTimeout(3000);

        await page.type(allSelectors.searchName, 'Test');

        let randomType = Math.floor(Math.random() * 3) + 1;
        await page.click(allSelectors.statusOp);
        await page.waitForTimeout(3000);
        for (let i = 0; i < randomType; i++) {
            await page.keyboard.press("ArrowDown");        
        }
        await page.keyboard.press('Enter');

        await page.click(allSelectors.searchBtn);

        await page.waitForTimeout(5000);
    });
    
    test.setTimeout(50000);
})