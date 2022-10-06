export class Slider {
    
    locator: string;
    upperLocator: string;
    lowerLocator: string;

    constructor(locator: string){
        this.locator = locator;
        this.lowerLocator = this.locator + ' div.noUi-handle-lower';
        this.upperLocator = this.locator + ' div.noUi-handle-upper';
    }

    public setUpperValue(value: number) {
        cy.get(this.upperLocator).invoke('val', value).trigger('change');
    }

    public setLowerValue(value: number) {
        cy.get(this.lowerLocator).invoke('val', value).trigger('change');
    }

    public setValue(value: number) {
        cy.get(this.lowerLocator).invoke('val', value).trigger('change');
    }

    public getValue() {
        return cy.get(this.lowerLocator).invoke('text');
    }

    public getUpperValue() {
        return cy.get(this.upperLocator).invoke('text');
    }

    public getLowerValue() {
        return cy.get(this.lowerLocator).invoke('text');
    }
}
