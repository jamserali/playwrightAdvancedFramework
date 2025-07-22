import {test , expect} from '@playwright/test'
import moment from "moment";

import testdata from '../test-data/qa/testdata.json';

type testData= {
    "testDataSet1":{
        "date1":string,
        "date2":string
    },
    "testDataSet2":{
        "date1":string,
        "date2":string
    }

}

const test_data = testdata as  testData;


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

for(let data in test_data){
    const date = test_data[data as keyof testData]

test(`Calendar demo using moment using JSON testdata ${date.date1}`, async ({ page }) => {

    await page.goto(`${process.env.Browser_URL}`);

    await selectDate(page,12, `${date.date1}`);
    await page.reload();
    await selectDate(page,5, `${date.date1}`);
    await page.reload();
    await selectDate(page,2, `${date.date1}`);

})

}





