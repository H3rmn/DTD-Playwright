import { test, expect } from '@playwright/test';
import {loginTest, resultCity, resultLocSelector, resultFirstname, envPhone, envEmail} from './utilities'; //import the utilities file

const allSelectors = {
    //Add Customer Selectors
    locationBtn: 'a#LocationsNavbarItem  .title',
    addLocationBtn: '#CreateNewLocationButton',

    //Add Location Modal
    nameInput: 'input#Name',
    addressInput: 'input#StreetAddress',
    categoryDrp: 'span#select2-CategoryId-container',
    contactTab: 'a#ContactsTabButton',
    saveBtn: '.save-button',

    //Edit Location
    editBtn: "[x-placement] [title='Edit']",
    contactBtn: '#ContactsTabButton',
    addContact: '#CreateNewSupplierContactButton',
    contNameInput: '.modal-md #Name',
    titleInput: 'input#Title',
    phoneNum: 'input#Phone',
    emailInput: 'input#Email',
    conSaveBtn: '.modal-md .save-button',
};

test.describe('Locations Page', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Add New Location', async ({page}) => {

        await page.context().grantPermissions(['geolocation']);

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Customers page
        await page.click(allSelectors.locationBtn);
        await page.waitForTimeout(2000);
        await page.click(allSelectors.addLocationBtn);
        await page.waitForTimeout(2000);

        await page.type(allSelectors.nameInput, resultCity);
        await page.waitForTimeout(2000);
        await page.type(allSelectors.addressInput, resultCity);
        await page.waitForTimeout(2000);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press('Enter');

        let randomType = Math.floor(Math.random() * 7) + 1;
        await page.click(allSelectors.categoryDrp);
        await page.waitForTimeout(2000);
        for (let i = 0; i < randomType; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');
        
        await page.click(allSelectors.saveBtn);
    });

    test('Edit Location', async ({page}) => {

        await page.context().grantPermissions(['geolocation']);

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Customers page
        await page.click(allSelectors.locationBtn);
        await page.waitForTimeout(2000);

        await page.click(resultLocSelector);
        await page.click(allSelectors.editBtn);
        await page.waitForTimeout(2000);

        await page.type(allSelectors.nameInput, 'Test ');
        await page.waitForTimeout(2000);

        let randomType = Math.floor(Math.random() * 7) + 1;
        await page.click(allSelectors.categoryDrp);
        await page.waitForTimeout(2000);
        for (let i = 0; i < randomType; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');
        
        await page.click(allSelectors.contactBtn);
        await page.click(allSelectors.addContact);
        await page.waitForTimeout(2000);

        await page.type(allSelectors.contNameInput, resultFirstname);
        await page.type(allSelectors.titleInput, 'Mr');
        await page.type(allSelectors.phoneNum, envPhone);
        await page.type(allSelectors.emailInput, envEmail);
        
        await page.click(allSelectors.conSaveBtn);
        await page.waitForTimeout(2000);

        await page.click(allSelectors.saveBtn);
    });
    
    test.setTimeout(50000);
})