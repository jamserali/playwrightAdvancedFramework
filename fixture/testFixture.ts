import {test as base} from '@playwright/test';
import HomePage from '../pages/homePage';
import HotelSearchPage from '../pages/hotelSearchPage';


export const test = base.extend<{
    myFixture:void,
    homePage:HomePage,
    hotelSearchPage:HotelSearchPage;


}>({
myFixture:[async ({ },use)=>{
    console.log("Global before is running...")

    await use();

    console.log("Global after each is running...")

},{
    auto:true,}],
    homePage:async ({page},use)=>{
        const homePage = new HomePage(page);
        await use(homePage)
    },
    hotelSearchPage:async ({page},use)=>{
        const hotelSearchPage = new HotelSearchPage(page);
        await use(hotelSearchPage)
    }

});

export {expect } from '@playwright/test';