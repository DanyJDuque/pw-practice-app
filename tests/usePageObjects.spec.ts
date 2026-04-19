import { test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'


test.beforeEach(async ({ page }) => {
    // await page.goto('http://localhost:4200/')
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async ({ page }) => {
    // const navigateTo = new NavigationPage(page)
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods @smoke', async ({ page }) => {
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    // const randomEmail = `${randomFullName}${faker.number.int(1000)}@test.com`.toLowerCase().replace(/\s/g, '')
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutPage()
    // await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectionOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectionOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    // await page.screenshot({ path: 'screenshots/formLayoutPage.png' })
    // // await pm.onFormLayoutsPage().submitInlineFormNameEmailAndCheckbox('Jane Doe', 'janeDoe@test.com', false)
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitInlineFormNameEmailAndCheckbox(randomFullName, randomEmail, false)
    // await page.locator('nb-card', { 'hasText': 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' })
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(100)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(5, 10)
})


test.only('testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
})