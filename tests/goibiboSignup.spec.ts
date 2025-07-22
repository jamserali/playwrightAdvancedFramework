import { test } from '@playwright/test';
import GoibiboSignUpPage from '../pages/goibiboSignupPage';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type Data = {
  name: string,
  email: string,
  password: string,
};

const records = parse(
  fs.readFileSync(path.join(__dirname, '../../test-data/dev/userdata.csv')),
  {
    columns: true,
    skipEmptyLines: true,
  }
) as Data[];

records.forEach((record, index) => {
  test(`Create new user in Goibibo__ ${index}`, async({ page }) => {
    await page.setViewportSize({width:1920,height:1080})
    const signupPage =  new GoibiboSignUpPage(page);
    await signupPage.goToURL();
    await signupPage.signUpNewUser(`${record['name']}`, `${record['email']}`, `${record['password']}`);
  });
});

