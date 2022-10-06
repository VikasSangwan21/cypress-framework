import { hasUncaughtExceptionCaptureCallback } from "process";

export class ButtonToggle {

    CAD_BUTTON_TOGGLE: string = 'cad-button-toggle';
    locator: string;
    option: string;
    activeOption: string;

    constructor(locator:string) {
        if(!locator.includes(this.CAD_BUTTON_TOGGLE)) {
            throw new Error('Invalid component')
        }
        this.locator = locator;
        this.option = this.locator + ' cad-button-toggle';
        this.activeOption = this.option + ' a.is-active';
    }

    public selectTabByTitle( tabTitle:string ) {
        cy.get(this.option).contains(tabTitle).click();
    }
    
    public selectTabByIndex( index:number ) {
        cy.get(this.option).eq(index).click();
    }

    public getSelectedTab() {
        return cy.get(this.activeOption).invoke('text');
    }
}