import {test} from '../../fixture/testFixture'
test("Fixture test-MMT ",async({page,homePage})=>{
    console.log("My  fixture is running...")
    await homePage.gotoURL()
    await homePage.closeModel()
    await homePage.clickHotelMenu()
    await homePage.clickSearchWidget()
    await homePage.getAllSearchedLoactionList("Mumbai")
    await homePage.selectDayMonthYear("July2025",26)
    await homePage.selectDayMonthYear("July2025",28)
    await homePage.selectRoomAndGuests(5)
})