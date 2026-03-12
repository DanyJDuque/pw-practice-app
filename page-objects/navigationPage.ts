import { Page } from "@playwright/test"

export class NavigationPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async formLayoutPage() {
        await this.selectGroupManuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage() {
        await this.selectGroupManuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.selectGroupManuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.selectGroupManuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectGroupManuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupManuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false") {
            await groupMenuItem.click()
        }
    }


}