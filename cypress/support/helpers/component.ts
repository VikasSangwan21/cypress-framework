import { ButtonToggle,
    ChipsDropDown,
    ChipsList,
    DropDown,
    DropDownWithSmartSearch,
    Header,
    Input,
    ManageMarketPopup,
    MultipleSelectionFilter,
    Slider,
    SmartSearchList,
    Spinner,
    Toggle } from './index';

export class Component {
    static ButtonToggle(locator: string) {
        return new ButtonToggle(locator);
    }

    static ChipsDropDown() {
        return new ChipsDropDown();
    }

    static ChipsList() {
        return new ChipsList();
    }

    static DropDown(locator: string) {
        return new DropDown(locator);
    }

    static DropDownWithSmartSearch() {
        return new DropDownWithSmartSearch();
    }

    static Header() {
        return new Header();
    }

    static Input(locator: string) {
        return new Input(locator);
    }

    static ManageMarketPopup() {
        return new ManageMarketPopup();
    }

    static MultipleSelectionFilter() {
        return new MultipleSelectionFilter();
    }

    static Slider(locator: string) {
        return new Slider(locator);
    }

    static SmartSearchList() {
        return new SmartSearchList();
    }

    static Spinner() {
        return new Spinner();
    }

    static RadioButton(locator: string) {
        return new Toggle(locator);
    }

}
