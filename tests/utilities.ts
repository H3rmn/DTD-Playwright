import { expect } from '@playwright/test';

//Login
export async function loginTest(page:any) {

    //Visit page
    await page.goto('https://dispatcherqa4.dumptruckdispatcher.com/Account/Login');
                
    //To put a tenant
    await page.locator("[href='\#']").click();
    await page.waitForSelector("input[name='TenancyName']", {timeout: 5000})
    await page.locator("input[name='TenancyName']").type("Test-QA");
    await page.locator(".save-button").click();

    //Username and password input fields
    await page.waitForTimeout(5000);
    await page.locator("[type='text']").type("admin");
    await page.locator("[type='password']").type("Temp1234!!");

    //Login button
    await page.waitForSelector("#login-button", {timeout: 5000})
    await page.locator("#login-button").click();

    //assertion
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://dispatcherqa4.dumptruckdispatcher.com/App/Dashboard');
}

//Functions getting the random item on arrays
export function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];

    return item;
}
    
//Variables
//to generate the date today
let date = new Date().toLocaleDateString("de-DE"); 

//generate random email, phone number, EmpID, account#
//For Register Account
let registerLastName = ["John", "Tomas", "Scot", "Yuna", "Lucas", "Joshua", "Jerome", "Nicole", "Ash", "Brown", "Jones", "Garcia", "Williams", "Smith", "Martinez", "Wilson", "Davis", "Johnson"];

//For Add/Edit Driver
let phoneNumber = Math.floor(10000000 + Math.random() * 90000000);
let email = Math.floor((Math.random() * 110) + 1)
let employeeID = Math.floor(1000000 + Math.random() * 9000000);
let licenseNumber = Math.floor(1000000 + Math.random() * 9000000);

//For Add/Edit Customer
let accountNo = Math.floor((Math.random() * 110) + 1)

//varaible and arrays of firstName,lastname,city and state, zipcode,Product or Services
//For Add/Edit Driver
let firstname = ["Test Kai", "Test Eliana", "Test Jaden", "Test Ezra", "Test Luca", "Test Rowan", "Test Nova", "Test Amara", "Test Aaliyah", "Test Finn", "Test Joshua", "Test Christ", "Test Marc", "Test Nicole", "Test Kayl", "Test Jen", "Test Romeo"];
let lastname = ["Test Smith", "Test Johnson", "Test Williams", "Test Brown", "Test Jones", "Test Garcia", "Test Miller", "Test Davis", "Test Martinez", "Test Wilson"];
let city = ["Davao", "Zamboanga", "Manila", "Makati", "Quezon City", "Calbayog City", "Cebu City", "Malaybalay", "Dumaguete", "Las Piñas", "Mandaluyong", "Navotas", "Angeles"]
let state = ["Pampanga","Isabela","Tarlac","Zambalez","Aurora","Bataan"];
let zipCode = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"]
let product = ["Hourly Hauling", "Red Sand", "Sand", "Dump", "Dirt", "Gravel", "Debris", "Coal"];
let licenseState = ["Active test", "Expired test", "Block test"];
let licenseType = ["Student test", "Non-pro test", "Pro test"]; 
let ExpDate = ["02/27/2029", "02/14/2030", "04/05/2026", "02/02/2032", "07/17/2033", "06/13/2031", "01/08/2027", "08/23/2025", "02/27/2037", "06/27/2040", "08/25/2041"];
let PhysDate = ["02/27/2020", "02/14/2021", "07/22/2022", "02/27/2023", "04/29/2024", "08/29/2025", "12/03/2026", "09/10/2027", "04/22/2028", "06/17/2029", "02/27/2030"];
let driverSelector = ["tr:nth-of-type(1) .btn.btn-primary.btn-sm", "tr:nth-of-type(2) .btn.btn-primary.btn-sm", "tr:nth-of-type(3) .btn.btn-primary.btn-sm",
"tr:nth-of-type(4) .btn.btn-primary.btn-sm", "tr:nth-of-type(5) .btn.btn-primary.btn-sm", "tr:nth-of-type(6) .btn.btn-primary.btn-sm"]; //Selector for edit driver
let customerSelector = ['tr:nth-of-type(2) .btn.btn-primary.btn-sm', 'tr:nth-of-type(3) .btn.btn-primary.btn-sm', 'tr:nth-of-type(4) .btn.btn-primary.btn-sm', 'tr:nth-of-type(5) .btn.btn-primary.btn-sm']; //Selector for Edit Customers
let productSelector = ["tr:nth-of-type(1) .btn.btn-primary.btn-sm", "tr:nth-of-type(2) .btn.btn-primary.btn-sm", "tr:nth-of-type(3) .btn.btn-primary.btn-sm", "tr:nth-of-type(4) .btn.btn-primary.btn-sm"]; //Selector for Edit Product/Services
let locationSelector = [ "tbody .odd:nth-of-type(1) .fa-ellipsis-h", "tr:nth-of-type(2) .btn.btn-primary.btn-sm", "tr:nth-of-type(3) .btn.btn-primary.btn-sm", "tr:nth-of-type(4) .btn.btn-primary.btn-sm"]; //Selector for Edit Location
let incomeTax = ["15", "20", "10", "5", "25"];
let quoteName = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8', 'Test9', 'Test10'];

//For Add Order
let deliveryDate = ["02/27/2024", "02/14/2024", "04/05/2024", "02/02/2024", "07/17/2024", "06/13/2024", "01/08/2024", "08/23/2024", "02/27/2024", "06/27/2024", "08/25/2024"];
let salesTax = ["7.5", "2.3", "3.67", "12.4", "2.12"];

//Getting the function and convert into constant variable
//For Register Account
export const resultRegLastName = getRandomItem(registerLastName);

//For Add/Edit Driver
export const resultFirstname = getRandomItem(firstname);
export const resultLastname = getRandomItem(lastname);
export const resultCity = getRandomItem(city);
export const resultState = getRandomItem(state);
export const resultZipCode = getRandomItem(zipCode);
export const resultProduct = getRandomItem(product);
export const resultLicenseState = getRandomItem(licenseState);
export const resultLicenseType = getRandomItem(licenseType);
export const resultExpDate = getRandomItem(ExpDate);
export const resultPhysDate = getRandomItem(PhysDate);
export const rersultDriverSelector = getRandomItem(driverSelector); //Select random driver selector

export const resultProdSelector = getRandomItem(productSelector); //Select random product selector
export const resultLocSelector = getRandomItem(locationSelector); //Select random location selector
export const resultIncomeTax = getRandomItem(incomeTax); //Select random income tax 
export const resultQoute = getRandomItem(quoteName); 

//For Add Order
export const resultDeliveryDate = getRandomItem(deliveryDate);
export const resultSaleTax = getRandomItem(salesTax);

//phone number, email, employeeId and account# 
//For Register Account
export var envRegEmail = resultRegLastName + email + date + "@gmail.com";

//For Add/Edit Driver
export var envPhone = "9" + (phoneNumber);
export var envEmail = "qatest+" + email + date + "@gmail.com";
export var envEmpId = "TestID" + employeeID;
export var envLicenseNum = "0" + licenseNumber;

//For Add/Edit Customer
export var envAccNo = "0" + accountNo;
export const resultCustomerSel = getRandomItem(customerSelector);