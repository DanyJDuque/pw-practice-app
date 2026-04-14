
import { test, expect } from '@playwright/test';
import { time } from 'console';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) // this will increase the timeout for this particular test by 2 seconds, allowing it to wait longer for the AJAX request to complete before throwing an error
})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = await successButton.textContent()

    // this will wait for the element to be visible and enabled before proceeding
    // await successButton.waitFor({ state: 'attached' }) 

    // const text = await successButton.allTextContents()
    // // expect(text).toEqual('Data loaded with AJAX get request.') 
    // expect(text).toContain('Data loaded with AJAX get request.') 

    // this will wait for the element to have the expected text before proceeding  
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test.skip('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // //____ wait for element
    // await page.waitForSelector('.bg-success')

    //____ wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be complete ('NOT REMOMMENDED')
    // this will wait for all network calls to be complete, but it can lead to flaky tests if there are long-running network calls or if the network is slow
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('timeouts', async ({ page }) => {
    // test.setTimeout(10000) // this will set the default timeout for all actions in this test to 10 seconds, allowing them to wait up to 10 seconds for elements to be actionable before throwing an error

    test.slow() // this will automatically increase the timeout for all actions in this test, allowing them to wait longer before throwing an error. This is useful for tests that are expected to take longer than usual, such as those that involve complex interactions or slow network responses.

    const successButton = page.locator('.bg-success')
    await successButton.click()
    // await successButton.click({timeout:16000})// this will override the default timeout for this particular action, allowing it to wait up to 16 seconds for the button to be clickable before throwing an error


})

