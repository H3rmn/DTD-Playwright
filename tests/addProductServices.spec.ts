import { test, expect } from '@playwright/test';
import { loginTest, resultProduct, resultProdSelector, resultIncomeTax } from './utilities';

const SEL = {
    //Add Product Selectors
    productsOrServicesNavbar: 'a#ProductsOrServicesNavbarItem .title',
    createNewServiceButton: '#CreateNewServiceButton',
    serviceInput: 'input#Service1',
    descriptionInput: 'input#Description',
    typeDropdown: 'span#select2-Type-container',
    saveButton: '.save-button',
    toastMessage: '.toast-message',

    //Edit Product Selectors
    editButton: "[x-placement] [title='Edit']",
    taxableCheckbox: 'input#IsTaxable',
    incomeAccountInput: '#IncomeAccount',
    createNewServicePriceButton: 'button#CreateNewServicePriceButton',
    designationDropdown: 'span#select2-ServicePrice_Designation-container',
    freightDropdown: 'span#select2-ServicePrice_FreightUomId-container',
    newPriceSaveBtn: "div:nth-of-type(5) > div[role='dialog'] .btn.btn-primary.save-button",

    //Search Filter Option Selectors
    searchBar: "[name='Name']",
    statusOp: 'span#select2-StatusFilter-container',
    searchBtn: '#SearchButton',
};

test.describe('Product/Services Page', () => {
    let page;

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies();
    });

    test('Adding New Product/Service', async ({page}) => {
        await loginTest(page);

        // await page.pause();
        await page.locator(SEL.productsOrServicesNavbar).click();
        await page.waitForTimeout(5000);
        await page.locator(SEL.createNewServiceButton).click();
        await page.waitForTimeout(5000);
        
        await page.locator(SEL.serviceInput).type(resultProduct);
        await page.locator(SEL.descriptionInput).type('Test');

        let randomType = Math.floor(Math.random() * 6) + 1;
        await page.locator(SEL.typeDropdown).click();
        for (let i = 0; i < randomType; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.locator(SEL.saveButton).click();
        await page.waitForSelector(SEL.toastMessage, { timeout: 5000 });
        await expect(page.locator(SEL.toastMessage)).toHaveText("Saved successfully.");
    });

    test('Edit Product / Services', async ({page}) => {
        
        await loginTest(page);

        // await page.pause();
        
        await page.locator(SEL.productsOrServicesNavbar).click();
        await page.waitForSelector(resultProdSelector);
        await page.locator(resultProdSelector).click();
        await page.waitForSelector(SEL.editButton);
        await page.locator(SEL.editButton).click();

        let randomType = Math.floor(Math.random() * 6) + 1;
        await page.locator(SEL.typeDropdown).click();
        for (let i = 0; i < randomType; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.locator(SEL.incomeAccountInput).fill(resultIncomeTax);
        await page.keyboard.press('Enter');
        await page.locator(SEL.taxableCheckbox).click();
        await page.locator(SEL.createNewServicePriceButton).click();

        await page.locator(SEL.designationDropdown).click();
        for (let i = 0; i < 3; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.locator(SEL.freightDropdown).click();
        await page.locator('ul#select2-ServicePrice_FreightUomId-results > li:nth-of-type(6)').click();

        await page.locator(SEL.newPriceSaveBtn).click();
        await page.waitForTimeout(3000);
        await page.locator(SEL.saveButton).click();
    });

    test('Search Filter Options', async ({page}) => {

        await loginTest(page);

        //Navigate to Product/Services page
        await page.locator(SEL.productsOrServicesNavbar).click();
        await page.waitForTimeout(3000);

        await page.type(SEL.searchBar, 'Test');
        
        let randomType = Math.floor(Math.random() * 3) + 1;
        await page.click(SEL.statusOp);
        await page.waitForTimeout(3000);
        for (let i = 0; i < randomType; i++) {
            await page.keyboard.press("ArrowDown");        
        }
        await page.keyboard.press('Enter');

        await page.waitForTimeout(5000);

        await page.click(SEL.searchBtn);
    });
    
    test.setTimeout(50000);
});
