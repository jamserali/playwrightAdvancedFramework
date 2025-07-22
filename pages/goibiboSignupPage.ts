import {Locator, Page} from '@playwright/test'
export default class GoibiboSignUpPage{

    readonly page:Page;
    readonly createAccount:Locator
    readonly yourName:  Locator
    readonly email:  Locator
    readonly password:  Locator
    readonly confirmPassword:  Locator
    readonly verifyEmail:  Locator



    constructor(page:Page){
        this.page=page;
        this.createAccount = this.page.locator("//*[text()='Create an account']")
        this.yourName = this.page.getByPlaceholder("First and last name")
        this.email = this.page.locator("id=Email address")
        this.password = this.page.locator("//*[@id='Password']").last()
        this.confirmPassword = this.page.locator("id=Confirm new password")
        this.verifyEmail = this.page.getByRole("button",{name:'Verify email address'})
    }

    async goToURL(){
        await this.page.goto(`${process.env.Goibibo_URL}`)
    }
    async  signUpNewUser(name:string,email:string,password:string){

        await this.createAccount.click()
        await this.yourName.fill(name)
        await this.email.fill(email)
        await this.password.fill(password)
        await this.confirmPassword.fill(password)
        await this.verifyEmail.click()

    }

}