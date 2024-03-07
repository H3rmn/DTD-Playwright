import { test, expect } from '@playwright/test';
import {loginTest, resultFirstname, resultLastname, resultCity, resultState, resultZipCode, envPhone, envEmail, envEmpId, resultLicenseState, rersultDriverSelector, envLicenseNum,
    resultLicenseType, resultExpDate, resultPhysDate,} from './utilities'; //import the utilities file

const allSelectors = {
    //Add Driver Selectors
    driverBtn: 'a#DriversNavbarItem  .title',
    createNewDriver: 'button#CreateNewDriverButton',
    Name: '#FirstName',
    LastName: '#LastName',
    Email: '#EmailAddress',
    Num: '#CellPhoneNumber',
    formatDropdown: 'span#select2-OrderNotifyPreferredFormat-container',
    Address: '#Address',
    City: '#City',
    State: '#State',
    ZipCode: '#ZipCode',
    ID: 'input#EmployeeId',
    saveBtn: '.save-button',
    toastMessage: '.toast-message',

    //Edit Driver Selectors
    editBtn: "[x-placement] [title='Edit']",
    statusTab: "li:nth-of-type(2) > a[role='tab']",
    licenseState: '#LicenseState',
    licenseNum: '#LicenseNumber',
    licenseType: '#TypeOfLicense',
    expiryDate: '#LicenseExpirationDate',
    lastPhyDate: '#LastPhysicalDate',
    nextPhyDate: '#NextPhysicalDueDate',
    lastMvr: '#LastMvrDate',
    nextMvr: '#NextMvrDueDate',
    dateHire: '#DateOfHire',
    termDate: '#TerminationDate',
    newSaveBtn: '.save-button',

    //Search Driver:
    searchName: 'input#NameFilter',
    statusOp: 'span#select2-StatusFilter-container',
    searchBtn: '#SearchButton',

};

test.describe('Drivers Page', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Adding Driver', async ({page}) => {
        
        //Calling the login function on utilities
        await loginTest(page);

        //Navigate to Driver page
        await page.click(allSelectors.driverBtn);
        await page.waitForTimeout(3000);
        await page.click(allSelectors.createNewDriver);
        await page.waitForTimeout(3000);

        //Driver modal
        await page.type(allSelectors.Name, resultFirstname);
        await page.type(allSelectors.LastName, resultLastname);
        await page.type(allSelectors.Email, envEmail);
        await page.type(allSelectors.Num, envPhone);

        //Generate random value 1-3
        let randomValue = Math.floor(Math.random() * 3) + 1;
        //For drop-down value getting randomly
        await page.click(allSelectors.formatDropdown);
        for (let i = 0; i < randomValue; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.fill(allSelectors.Address, resultCity + " "+ resultState);
        await page.fill(allSelectors.City, resultCity);
        await page.fill(allSelectors.State, resultState);
        await page.fill(allSelectors.ZipCode, resultZipCode);
        await page.fill(allSelectors.ID, envEmpId);

        await page.click(allSelectors.saveBtn);
        await page.waitForSelector(allSelectors.toastMessage, {timeout: 5000});
        await expect(page.locator(allSelectors.toastMessage)).toHaveText("Saved successfully.");

        await page.waitForTimeout(3000);
    });

    test('Edit Driver',async ({page}) => {
        
        //calling the login function on utilities
        await loginTest(page);

        //Navigate to driver page
        await page.click(allSelectors.driverBtn);
        await page.waitForTimeout(3000);

        // await page.pause();

        //edit the driver
        await page.click(rersultDriverSelector);
        await page.click(allSelectors.editBtn);
        await page.waitForTimeout(3000);

        await page.click(allSelectors.statusTab);
        await page.fill(allSelectors.licenseState, resultLicenseState);
        await page.fill(allSelectors.licenseNum, envLicenseNum);
        await page.fill(allSelectors.licenseType, resultLicenseType);

        await page.fill(allSelectors.expiryDate, resultExpDate);
        await page.fill(allSelectors.lastPhyDate, resultPhysDate);
        await page.fill(allSelectors.nextPhyDate, resultExpDate);
        await page.fill(allSelectors.lastMvr, resultPhysDate);
        await page.fill(allSelectors.nextMvr, resultExpDate);
        await page.fill(allSelectors.dateHire, resultPhysDate);
        await page.fill(allSelectors.termDate, resultExpDate);

        await page.click(allSelectors.newSaveBtn);
        await page.waitForTimeout(5000);
    });
 
    test('Testing Search Bar & Status', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);
 
        //Navigate to driver page
        await page.click(allSelectors.driverBtn);
        await page.waitForTimeout(3000);

        //Get random value on table (Ex: Column Name)
        const names = await page.$$eval('table tr td:nth-of-type(2)', cells => cells.map(cell => cell.textContent?.trim()));
        const randomName = names[Math.floor(Math.random() * names.length)];

        //covert the variable into string
        const validRandomName = randomName as string;

        await page.locator("input#NameFilter").type(validRandomName);

        // let randomType = Math.floor(Math.random() * 3) + 1;
        // await page.click(allSelectors.statusOp);
        // await page.waitForTimeout(3000);
        // for (let i = 0; i < randomType; i++) {
        //     await page.keyboard.press("ArrowDown");        
        // }
        // await page.keyboard.press('Enter');

        await page.click(allSelectors.searchBtn);

        await page.waitForTimeout(5000);
    });
    
    test.setTimeout(50000);
})

