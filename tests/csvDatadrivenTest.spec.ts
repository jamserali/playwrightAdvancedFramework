import {test , expect} from '@playwright/test'
import moment from "moment";
import {parse} from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type testRecord ={
    skill1:string,
    skill2:string
}

const records= parse(fs.readFileSync(path.join(__dirname,'../test-data/qa/testdata.csv')),{
    columns:true,
    skipEmptyLines:true
}) as testRecord[];


   

    async function selectDate(page,date: number, dateToSelect: string) {
        await page.click("//input[@placeholder='Start date']")

        const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
        const next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

        // let dateToSelect: string = "May 2019";
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
        console.log("this month? " + thisMonth);
        while (await mmYY.textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }
        await page.click(`//td[@class='day'][text()='${date}']`);
    }


for(let record of records){

test(`Calendar demo using CSV data driven : ${record.skill1}`, async ({ page }) => {

    await page.goto(`${process.env.Browser_URL}`);

    await selectDate(page,12, `${record.skill1}`);
    await page.reload();
    await selectDate(page,5, `${record.skill1}`);
    await page.reload();
    await selectDate(page,2, `${record.skill1}`);
 
})

  
}



