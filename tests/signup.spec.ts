import { test, expect } from '@playwright/test';
import { resultRegLastName, envRegEmail } from './utilities';

const allSelectors = {
    changeTenant: "[href='\#']",
    tenancyName: "input[name='TenancyName']",
    saveTenantBtn: '.save-button',
    registerBtn: 'a#register-btn',
    firstName: "input[name='Name']",
    lastName: "input[name='Surname']",
    emailAddress: "input[name='EmailAddress']",
    userName: "input[name='UserName']",
    password: "input#RegisterPassword",
    confirmPass: "input[name='PasswordRepeat']",
    submitBtn: '#register-submit-btn',
    requiredName: "#Name-error",
    requiredSurname: "#Surname-error",
    requiredEmail: "#EmailAddress-error",
    requiredUsername: "#UserName-error",
    requiredPassword: "#RegisterPassword-error",
    requiredConfirmPass: "#PasswordRepeat-error" 

};

test.describe('Signup', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies(); //To clear browser data
    });


    test('Empty all fields', async ({page}) => {

        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(allSelectors.changeTenant);
        await page.waitForSelector(allSelectors.tenancyName, {timeout: 5000})
        await page.type(allSelectors.tenancyName, 'Test-QA');
        await page.click(allSelectors.saveTenantBtn);
    
        //Create account button
        await page.click(allSelectors.registerBtn);
        await page.waitForTimeout(3000);
       // await page.pause();
        //Submit button
        await page.click(allSelectors.submitBtn);

        await page.waitForTimeout(3000);

        //Assertion
        await expect(page.locator(allSelectors.requiredName)).toHaveText("This field is required.");
        await expect(page.locator(allSelectors.requiredSurname)).toHaveText("This field is required.");
        await expect(page.locator(allSelectors.requiredEmail)).toHaveText("This field is required.");
        await expect(page.locator(allSelectors.requiredUsername)).toHaveText("This field is required.");
        await expect(page.locator(allSelectors.requiredPassword)).toHaveText("This field is required.");
        await expect(page.locator(allSelectors.requiredConfirmPass)).toHaveText("This field is required.");
    });

    test('Invalid Email', async ({page}) => {

        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(allSelectors.changeTenant);
        await page.waitForSelector(allSelectors.tenancyName, {timeout: 5000})
        await page.type(allSelectors.tenancyName, 'Test-QA');
        await page.click(allSelectors.saveTenantBtn);
    
        //Create account button
        await page.click(allSelectors.registerBtn);
        
        //Sign up form
        await page.type(allSelectors.firstName, 'Test');
        await page.type(allSelectors.lastName, resultRegLastName);
        await page.type(allSelectors.emailAddress, "testgmail.com");
        await page.type(allSelectors.userName, resultRegLastName);
        await page.type(allSelectors.password, 'password101');
        await page.type(allSelectors.confirmPass, 'password101');
        await page.click(allSelectors.submitBtn);

        //await expect(page.locator(allSelectors.requiredEmail)).toHaveText("Please enter a valid Email.");
    });

    test('Unmatch pass and repeat pass', async ({page}) => {

        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(allSelectors.changeTenant);
        await page.waitForSelector(allSelectors.tenancyName, {timeout: 5000})
        await page.type(allSelectors.tenancyName, 'Test-QA');
        await page.click(allSelectors.saveTenantBtn);
    
        //Create account button
        await page.click(allSelectors.registerBtn);
        
        //Sign up form
        await page.type(allSelectors.firstName, 'Test');
        await page.type(allSelectors.lastName, resultRegLastName);
        await page.type(allSelectors.emailAddress, "test@gmail.com");
        await page.type(allSelectors.userName, resultRegLastName);
        await page.type(allSelectors.password, 'password101');
        await page.type(allSelectors.confirmPass, 'password10');
        await page.click(allSelectors.submitBtn);

        //await expect(page.locator(allSelectors.requiredConfirmPass)).toHaveText("Please enter the same value again.");
    });
        
    test('Creating new account', async ({page}) => {

        //Visit page
        await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
    
        //To put a tenant
        await page.click(allSelectors.changeTenant);
        await page.waitForSelector(allSelectors.tenancyName, {timeout: 5000})
        await page.type(allSelectors.tenancyName, 'Test-QA');
        await page.click(allSelectors.saveTenantBtn);
    
        //Create account button
        await page.click(allSelectors.registerBtn);
        
        //Sign up form
        await page.type(allSelectors.firstName, 'Test');
        await page.type(allSelectors.lastName, resultRegLastName);
        await page.type(allSelectors.emailAddress, envRegEmail);
        await page.type(allSelectors.userName, resultRegLastName);
        await page.type(allSelectors.password, 'password101');
        await page.type(allSelectors.confirmPass, 'password101');
        await page.click(allSelectors.submitBtn);
    });
    
    test.setTimeout(50000);
})
