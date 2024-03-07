import { test, expect } from '@playwright/test';
import {loginTest} from './utilities'; //import the utilities file

const allSelectors = {
    truckAvail: '#truckAvailabilityContainer .has-data',
    serviceStat: "[href='\/App\/PreventiveMaintenanceSchedule'] .has-data",
    licenseStat: '#licensePlateStatusContainer .has-data',
    driverLicenseStat: '#driverLicenseStatusContainer .has-data',
    physicalStat: '#physicalStatusContainer .has-data',
    driverMvrStat: '#driverMVRStatusContainer .has-data',
};

test.describe('Navigate on Dashboard', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Click Truck Availability', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        await page.click(allSelectors.truckAvail);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Trucks');
    });

    test('Click Service Status', async ({page}) => {

        //calling the login function on utilities
        await loginTest(page);

        await page.click(allSelectors.serviceStat);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/PreventiveMaintenanceSchedule');
    });

    test('Click License Plate Status', async ({page}) => {

        //calling the login function on utilities
        await loginTest(page);

        await page.click(allSelectors.licenseStat);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Trucks');
    });

    test('Click Driver License Status', async ({page}) => {

        //calling the login function on utilities
        await loginTest(page);

        await page.click(allSelectors.driverLicenseStat);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Drivers');
    });

    test('Click Physical Status', async ({page}) =>{

        //calling the login function on utilities
        await loginTest(page);

        await page.click(allSelectors.physicalStat);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Drivers');
    });

    test('Click Driver MVR Status', async ({page}) => {

        //calling the login function on utilities
        await loginTest(page);

        await page.click(allSelectors.driverMvrStat);
        await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Drivers');
    });
    
    test.setTimeout(50000);
})
