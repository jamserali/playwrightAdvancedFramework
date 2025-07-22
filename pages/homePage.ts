import {Page,Locator} from '@playwright/test';

export default class HomePage{
    readonly page:Page;
    readonly hotel_menu_link:Locator
    readonly hotelSearchWidget: Locator
    readonly searchLocation: Locator
    readonly allSearchedLoactionList: Locator
    readonly checkInDate:Locator
    readonly checkoutDate:Locator
    readonly dateYearCalenderLoc : Locator
    readonly days:Locator
    readonly modalCloseButton:Locator
    readonly nextMonth:Locator
    readonly previousMonth:Locator
    readonly roomCount:Locator
    readonly adultsCount:Locator
    readonly childrenCount:Locator
    readonly guestSelectList:Locator
    readonly applyButton:Locator
    readonly getMeBestPriceButton:Locator
    constructor(page:Page){
        this.page=page;
        this.modalCloseButton = this.page.locator("//*[@data-cy='closeModal']")
        this.hotel_menu_link = this.page.locator('//*[@data-cy="menu_Hotels"]')
        this.hotelSearchWidget = this.page.locator('//*[@data-cy="HotelSearchWidget_316"]')
        this.searchLocation = this.page.getByPlaceholder('Where do you want to stay?')
        this.allSearchedLoactionList = this.page.locator('//*[@class="react-autosuggest__suggestions-list"]//li//p[@class="sr_city"]//*[@class="blackText"]')
        this.checkInDate = this.page.locator('#checkin')
        this.dateYearCalenderLoc = this.page.locator("(//*[@class='DayPicker-Months']//*[@class='DayPicker-Caption'])[1]//div") 
        this.days= this.page.locator('(//*[@class="DayPicker-Month"])[1]//*[@class="DayPicker-Day"]')
        this.nextMonth =this.page.locator("//*[@aria-label='Next Month']")
        this.previousMonth = this.page.locator("//*[@aria-label='Previous Month']")
        this.checkoutDate = this.page.locator('#checkout')
        this.roomCount = this.page.locator("//*[@class='rmsGst__row']//div//p[text()='Room']//..//..//div[2]")
        this.adultsCount = this.page.locator("//*[@class='rmsGst__row']//div//p[text()='Adults']//..//..//div[2]")
        this.childrenCount = this.page.locator("//*[@class='rmsGst__row']//div//p[text()='Children']//..//..//div[2]")
        this.guestSelectList = this.page.locator("//*[@class='gstSlct__list']//li")
        this.applyButton = this.page.getByRole('button',{name:'APPLY'})
        this.getMeBestPriceButton =this.page.getByRole('button',{name:'GET ME BEST PRICES'}).first()
    }


    async gotoURL(){
        await this.page.goto(`${process.env.MMT_URL}`)
    }
    async closeModel(){
        await this.modalCloseButton.click()
    }

    async clickHotelMenu(){
        await this.hotel_menu_link.click()
    }
    async clickSearchWidget(){
        await this.hotelSearchWidget.click()
    }
    
    async getAllSearchedLoactionList(location:string){
        await this.searchLocation.fill(location)
       const locatorList =  await this.allSearchedLoactionList.all()
       for(let loc of  locatorList){
        const text = await loc.textContent();
        if (text?.toLowerCase() === location.toLowerCase()){
            await loc.click()
            break
        }
    }
    }

   
    async selectDayMonthYear(monthYear: string, exp_day: number) {
        const dateYear = await this.dateYearCalenderLoc.textContent();
        if (dateYear && dateYear !== monthYear) {
            await this.nextMonth.click()

        }

        if (dateYear && dateYear === monthYear) {
            const days = await this.days.all();
            for (const day of days) {
                const text = await day.textContent();
                const dayNumber = Number(text);
                if (!isNaN(dayNumber) && dayNumber === exp_day) {
                    await day.click();
                    break;
                }
            }
        }
    }

    async selectRoomAndGuests(noOfRoom:number,child:number=0){
        await this.roomCount.click()
        // room and adults
        const quantities = await this.guestSelectList.all()
        for(let room of quantities){
            if(Number(await room.textContent()) === noOfRoom){
                await room.click()
                break
            }
        }
        // children 
        if (child>0){
            await this.childrenCount.click()
            for(let child of quantities){
            if(Number(await child.textContent()) === noOfRoom){
                await child.click()
                break
            }
        }
        }
        await this.applyButton.click()
        await this.getMeBestPriceButton.click()
    }








}