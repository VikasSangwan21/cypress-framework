export class Spinner {
    locator: string = 'cad-spinner';
    public isSpinnerVisible() {
        return cy.get(this.locator).then(status => {
            return status.is(':visible');
        });
    }
}
