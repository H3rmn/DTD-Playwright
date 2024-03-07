import { test, expect } from '@playwright/test';
import {loginTest, resultDeliveryDate, resultSaleTax} from './utilities'; //import the utilities file

const SEL = {
    oderBtn: 'a#ViewOrdersNavbarItem > .m-menu__link-text',
    createNewOrder: '#CreateNewOrderButton',
    deliveryDate: '#DeliveryDate',
    customerDropdown: 'span#select2-OrderCustomerId-container',
    searchBar: "[type='search']",
    saleTax: '#SalesTaxRate',
    comments: '#Directions',
    priorityDropdown: 'span#select2-OrderPriority-container',
    saveBtn: '#SaveOrderButton',
    toastMessage: '.toast-message'
};

test.describe('Order Page', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Add Order', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        //Navigate to Oder page
        await page.click(SEL.oderBtn);
        await page.waitForTimeout(3000);

        await page.click(SEL.createNewOrder);
        await page.fill(SEL.deliveryDate, resultDeliveryDate);
        await page.click(SEL.customerDropdown);

        //Generate random value 1-3
        let randomValue = Math.floor(Math.random() * 3) + 1;
        //For drop-down value getting randomly
        await page.fill(SEL.searchBar, 'Test');
        await page.waitForTimeout(3000);
        for (let i = 0; i < randomValue; i++ ){
            await page.keyboard.press("ArrowDown"); 
            await page.waitForTimeout(3000);
        }
        await page.keyboard.press('Enter');

        await page.fill(SEL.saleTax, resultSaleTax);
        await page.locator(SEL.comments).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget dolor quis massa posuere blandit eget id sapien. Nulla finibus purus sapien, a euismod arcu venenatis nec.');

        let randomPriority = Math.floor(Math.random() * 2) + 1;
        //For drop-down value getting randomly
        await page.click(SEL.priorityDropdown);
        for (let i = 0; i < randomPriority; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');
        
        await page.locator(SEL.saveBtn).click();
        // await page.waitForSelector(SEL.toastMessage, {timeout: 5000});
        // await expect(page.locator(SEL.toastMessage)).toHaveText("Saved successfully.");

        // await page.waitForTimeout(3000);
    });
    
    test.setTimeout(50000);

})