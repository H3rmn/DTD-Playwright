import { test, expect } from '@playwright/test';
import { loginTest } from './utilities';

const SEL = {
    changeTenant: "[href='\#']",
    tenancyName: "input[name='TenancyName']",
    saveTenantBtn: '.save-button',
    userName: "[type='text']",
    passWord: "[type='password']",
    loginBtn: '#login-button',
};

test.describe('Login', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });

    test('Wrong Username',async ({page}) => {

        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(SEL.changeTenant);
        await page.waitForSelector(SEL.tenancyName, {timeout: 5000})
        await page.type(SEL.tenancyName, 'Test-QA');
        await page.click(SEL.saveTenantBtn);
    
        //Username and password input fields
        await page.waitForTimeout(3000);
        await page.type(SEL.userName, 'test');
        await page.type(SEL.passWord, 'Temp1234!!');
    
        //Login button
        await page.waitForSelector(SEL.loginBtn, {timeout: 5000})
        await page.click(SEL.loginBtn);
    
        //assertion
        await page.waitForTimeout(3000);
        await expect(page.locator('.swal-title')).toHaveText("Login failed!");
        await expect(page.locator('.swal-text')).toHaveText("Invalid user name or password");
    });
    
    test('Wrong password',async ({page}) => {
    
        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(SEL.changeTenant);
        await page.waitForSelector(SEL.tenancyName, {timeout: 5000})
        await page.type(SEL.tenancyName, 'Test-QA');
        await page.click(SEL.saveTenantBtn);
    
        //Username and password input fields
        await page.waitForTimeout(3000);
        await page.type(SEL.userName, 'test');
        await page.type(SEL.passWord, 'Temp1234%%');
    
        //Login button
        await page.waitForSelector(SEL.loginBtn, {timeout: 5000})
        await page.click(SEL.loginBtn);
    
        //assertion
        await page.waitForTimeout(3000);
        await expect(page.locator('.swal-title')).toHaveText("Login failed!");
        await expect(page.locator('.swal-text')).toHaveText("Invalid user name or password");
    });
    
    test('Without tenant',async ({page}) => {
    
        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //Username and password input fields
        await page.waitForTimeout(3000);
        await page.type(SEL.userName, 'Admin');
        await page.type(SEL.passWord, 'Temp1234!!');
    
        //Login button
        await page.waitForSelector(SEL.loginBtn, {timeout: 5000})
        await page.click(SEL.loginBtn);
    
        //assertion
        await page.waitForTimeout(3000);
        await expect(page.locator('.swal-title')).toHaveText("Login failed!");
        //await expect(page.locator('.swal-text')).toHaveText("The user account has been locked out. Please try again later.");
    });
    
    test('Succesfull Login', async ({page}) => {
        
        await loginTest(page);
    });
    
    test.setTimeout(50000);
})

