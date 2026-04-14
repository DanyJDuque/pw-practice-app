import { test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
    // const navigateTo = new NavigationPage(page)
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    
})

test('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    // const randomEmail = `${randomFullName}${faker.number.int(1000)}@test.com`.toLowerCase().replace(/\s/g, '')
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`


    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectionOption('test@test.com', 'Welcome1', 'Option 1')
    // await pm.onFormLayoutsPage().submitInlineFormNameEmailAndCheckbox('Jane Doe', 'janeDoe@test.com', false)
    await pm.onFormLayoutsPage().submitInlineFormNameEmailAndCheckbox(randomFullName, randomEmail, false)
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(200)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(5, 10)
})
