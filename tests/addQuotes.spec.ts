import { test, expect } from '@playwright/test';
import {loginTest, resultQoute} from './utilities'; //import the utilities file

const allSelectors = {
    //Add Quotes Selectors
    quotesBtn: 'a#QuotesNavbarItem > .m-menu__link-text',
    addQoutesBtn: '#CreateNewQuoteButton',
    nameInput: 'input#Name',
    descInput: '#Description',
    custDrpDwn: 'span#select2-QuoteCustomer-container',
    custSearch: "[type='search']",
    addQouteItem: '#CreateNewQuoteServiceButton',
    saveBtn: '.save-quote-button',
    designation: 'span#select2-quote-service-Designation-container',
    loadAt: 'span#select2-quote-service-LoadAtId-container',
    searchLoad: "input[role='searchbox']",
    item: 'span#select2-quote-service-ServiceId-container',
    searchItem: "input[role='searchbox']",
    matUOM: 'span#select2-quote-service-MaterialUomId-container',
    MatRate: '#quote-service-PricePerUnit',
    matQty: '#quote-service-MaterialQuantity',
    jobNum: '#quote-service-JobNumber',
    note: 'textarea#Note',

};

test.describe('Quotes Page', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Add New Quotes', async ({page}) => {

        //calling the login function on utilities    
        await loginTest(page);

        await page.click(allSelectors.quotesBtn);
        await page.waitForTimeout(2000);
        await page.click(allSelectors.addQoutesBtn);
        await page.waitForTimeout(2000);
        
        await page.type(allSelectors.nameInput, resultQoute);
        await page.waitForTimeout(2000);
        await page.type(allSelectors.descInput, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis nibh enim, a facilisis lectus consequat tincidunt.');

        let randomType = Math.floor(Math.random() * 4) + 1;
        await page.click(allSelectors.custDrpDwn);
        await page.type(allSelectors.custSearch, 'Test');
        await page.waitForTimeout(2000);
        for (let i = 0; i < randomType; i++ ){
            await page.keyboard.press("ArrowDown"); 
        }
        await page.keyboard.press('Enter');

        await page.click(allSelectors.addQouteItem);
        await page.click(allSelectors.designation);
        await page.click('li:nth-of-type(2) > span');
        await page.click(allSelectors.loadAt);
        await page.type(allSelectors.searchLoad, 'Test');
        await page.waitForTimeout(2000);
        await page.click('ul#select2-quote-service-LoadAtId-results > li:nth-of-type(2)');
        await page.click(allSelectors.item);
        await page.type(allSelectors.searchItem, 'Test');
        await page.click('ul#select2-quote-service-ServiceId-results > li:nth-of-type(2)');
        await page.click(allSelectors.matUOM);
        await page.click('li:nth-of-type(3) > span');
        await page.fill(allSelectors.MatRate, '185');
        await page.type(allSelectors.matQty, '5');
        await page.type(allSelectors.jobNum, '3');
        await page.fill(allSelectors.note, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis nibh enim, a facilisis lectus consequat tincidunt.');
        await page.click('.save-button');

        await page.click(allSelectors.saveBtn);
    });

    test.setTimeout(50000);
})