import { RfpListPage } from './pages/components/rfp-list.page';
import { rfpResponsePage } from './pages/components/rfp-response.page';
import { CampaignPage, CampaignCreatePage, CampaignFilterPage, CampaignSortPage, MapsPage, SandboxCreatePage, ViewResponsePage } from './pages';
import { ViewRFPResponsePage } from './pages/components/rfp-view-response.page';
import { ViewRFPPage } from './pages/components/rfp-view.page';
import { RfpAddResponse } from './pages/components/rfp-add-response.page';

export class PageAction {
   
    // static campaignList: string[] = [];

    static campaignList: any[] = [
    'e2e test - 63311',
    'e2e test - 46107',
    'e2e test - 24736',
    'e2e test - 96574',
    'e2e test - 35493',
    'e2e test - 17802',
    'e2e test - 10754',
    'coca-cola-001'];

    locator: string;
   
    constructor(locator: string) {
        this.locator = locator;
    }

    // ####################################################
    //                  Page Builder
    // ####################################################

    static campaignPage() {
        return new CampaignPage();
    }

    static campaignCreatePage() {
        return new CampaignCreatePage();
    }

    static rfpListPage() {
        return new RfpListPage()
    }

    static rfpResponsePage() {
        return new rfpResponsePage()
    }

    static CampaignFilterPage() {
        return new CampaignFilterPage();
    }

    static CampaignSortPage() {
        return new CampaignSortPage();
    }

    static SandboxCreatePage() {
        return new SandboxCreatePage();
    }

    static ViewResponsePage() {
        return new ViewResponsePage();
    }

    static ViewRFPResponsePage(){
        return new ViewRFPResponsePage();
    }

    static ViewRFPPage(){
        return new ViewRFPPage();
    }

    static RFPAddResponsePage(){
        return new RfpAddResponse();
    }

    static mapsPage() {
        return new MapsPage();
    }
    // ####################################################
    //                  Action Builder
    // ####################################################
    public static isElementExist(locator: string) {
        return new Promise((resolve) => {
            cy.get(locator).its('length').then(res => {
                if (res > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    public static getCurrentUrl() {
        return cy.url();
    }
}
