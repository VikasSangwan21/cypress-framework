import { PageAction } from '../../PageAction';

export class Toggle {
    locator: string;
    constructor(locator:string) {
        this.locator = locator;
    }

    isToggleOn () {
        PageAction.isElementExist(this.locator + ' div.toggle--on').then((res) => {
            return res;
        });
    }
}