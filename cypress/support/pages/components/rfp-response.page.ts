export class rfpResponsePage {

  pageName = 'rfpResponsePage';
  url = 'ooh/rfp';

  // DATA AUTOMATION TAGS
  btnDecline = '[data-automation="ooh-campaign-detail-action-reject-rfp"] > .cad-button';
  btnSAddResponse = '[data-automation="ooh-campaign-detail-action-add-response"] > .cad-button';
  btnAddResponseSentStatus = '.campaign-container__actions > [data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button > .cad-button__content-wrapper > .cad-button__text > span';
  // btnSendRFP = '[data-automation="ooh-campaign-detail-action-send-rfp"]';
  btnSendRFP = '[data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button';
  campaignName = '[data-automation="ooh-rfp-list--name"]';
  campaignNameTitle = '.campaign-container__title--holder > .title';
  generalInfoTitle = 'campaign-detail-basic.ng-star-inserted > :nth-child(1) > .col-md-12 > .title';
  objectiveTitle = ':nth-child(2) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label';
  agencyTitle = ':nth-child(2) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label';
  clientTitle = ':nth-child(3) > .campaign-container__element > .campaign-container__element__label';
  budgetTitle = ':nth-child(3) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label';
  campaignDateTitle = ':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label';
  campaignDates = ':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__text';
  campaignDescriptionTitle = ':nth-child(4) > .campaign-container__element > .campaign-container__element__label';
  campaignNameTtl = ':nth-child(4) > .campaign-container__element > .campaign-container__element__text';
  clientname = '[data-automation="ooh-rfp-list-client"]';
  viewResopnse = '[data-automation="ooh-rfp-list-view-response"]';
  toggle = '[data-automation="button-toggle-group"]';
  object = '[data-automation="ooh-campaign__objective"]';
  agency = '[data-automation="ooh-campaign__agency"]';
  // client = '[data-automation="ooh-rfp-list-client"]';
  client = '[data-automation="client-value"]';
  budget = '[data-automation="budget-value"]';
  nextPage = '[data-automation="cad-pagination__btn_next"]';
  prevPage = '[data-automation="cad-pagination__btn_prev"]';
  download = '[data-automation="ooh-shared-attachments-download-action"]';
  viewInMap = '[data-automation="ooh-campaign-manage-linktomap"] .cad-button';
  statusMessage = '.cad-toast__message';
  collapsableErrors = 'div.cad-collapsible-panel__head__custom-title';
  expandErrors = '.cad-collapsible-panel__head .ng-star-inserted';
  errorlist = '.cad-collapsible-panel__content'
  individualErrors = '.cad-collapsible-panel__content>div'
  // mediaFormatCount = '[data-automation="ooh-campaign-frames-counter"]';
  mediaFormatCount =
    '.campaign-container__media-formatwrap > .panel-head__text > .title';
  mediaFormatRow =
    '.campaign-container__media-formatwrap > .ng-star-inserted >';
  attachmentsrow =
    '[data-automation="ooh-shared-attachments-table-data"] > .ng-star-inserted';
  // unitsCount = '[data-automation="ooh-campaign-frames-counter"]'
  // unitsCount =
  //   '.col-12 .row > .panel-head__text > .title';
  unitsRow =
    '.campaign-container__frames > .container-fluid > :nth-child(1) > .col-12 > section.ng-star-inserted > :nth-child(3) .row';
  poiTitle = '[data-automation="ooh-campaign-poi-table-data"] > .row';
  poiCount = '[data-automation="ooh-campaign-poi-counter"]';
  poiRow =
    '[data-automation="ooh-campaign-poi-table-data"] > .ng-star-inserted > .col-md-12 > .row';

  attachemntsRows = '[data-automation="ooh-shared-attachments-table-data"] .ng-star-inserted .row'

  headerCancel =
    '.rfp-container__header__actions > [data-automation="ooh-rfp-detail-action-cancel"] > .cad-button';
  cancel =
    '.rfp-container__sticky-buttons > [data-automation="ooh-rfp-detail-action-cancel"] > .cad-button';
  headerSave =
    '.rfp-container__header__actions > [data-automation="ooh-rfp-detail-action-save"] > .cad-button';
  save =
    '.rfp-container__sticky-buttons > [data-automation="ooh-rfp-detail-action-save"] > .cad-button';
  headerSendResponse = '.rfp-container__header__actions > .ml-20 > .cad-button';
  sendResponse = '.rfp-container__sticky-buttons > .ml-20 > .cad-button';

  addByID = '[data-automation="ooh-rfp-response-frames-add-link"] > .cad-link';
  addByIdSearch = '[data-automation="ooh-rfp-response-search-frames-by-id"]'
  importFromFile = '[data-automation="ooh-rfp-response-frames-import-link"]';
  downloadTemplate =
    '[data-automation="ooh-rfp-response-frames-download-link"]';

  footerCancel = '.rfp-container__actions-left > cad-button > .cad-button';
  footerSave =
    '.rfp-container__actions-right > [data-automation="ooh-rfp-detail-action-save"] > .cad-button';
  footerSendResponse = '.rfp-container__actions-right > .ml-20 > .cad-button';

  addByIdSearchBtn = '[data-automation="popup_footer"] .cad-button';
  addByIdCancel = '[text="buttons.cancel"] > .cad-button';
  addByIdDone = '[text="ooh.rfp.done"] > .cad-button';
  downloadUnits = '[data-automation="ooh-rfp-response-frames-download-units"]'
  // deleteAll = '[data-automation="ooh-rfp-response-frames-delete-all"]'
  responseUnitsCount = '.rfp-container__body-title > span';
  unitsCount = 'section.ng-star-inserted > :nth-child(1) > .panel-head__text > .title';
  copyErrors = '[data-automation="ooh-rfp-response-frames-add-link"]'
  addByIDErrorTitle = '[data-automation="popup_body"] .response__list__modal__body-idsInError .error-list'
  addByIDErrorList = '[data-automation="popup_body"] .response__list__modal__body-idsInError .errorListIds'

  leaveBtn = '[data-automation="unsaved-popup-leave-btn"] > .cad-button';
  stayBtn = '[data-automation="unsaved-popup-stay-btn"] > .cad-button';

  packAddbyID = '[data-automation="ooh-rfp-response-frames-add-link"]'
  packImport = '[data-automation="ooh-rfp-packages-frames-import-link"]'
  packDownloadTemp = '[data-automation="ooh-rfp-packages-frames-download-link"]'
  packDownloadUnits = '[data-automation="ooh-rfp-response-package-download-units"]'

  packageCancel =
    '[data-automation="ooh-rfp-package-action-cancel"] > .cad-button';
  packageSave =
    '[data-automation="ooh-rfp-package-action-send-response"] > .cad-button';

  imgBrowseBtn = '.uploader > :nth-child(3) > cad-button > .cad-button';
  imgDoneBtn = '[modal-footer=""] > cad-button > .cad-button';

  selectType = '[data-automation="Select Type"]';
  selectMarket = '[data-automation="Select Market"]';
  packageSize = '[data-automation="ooh-package-size"]';
  locationDesc = '[data-automation="ooh-package-location"]';
  rationale = '[data-automation="ooh-package-rationale"]';
  units = '[data-automation="ooh-package-net-rates-units"]';
  netRateCard = '[data-automation="ooh-package-rate-card"]';
  netRateCardSymbol = `:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`;
  netNegoRate = '[data-automation="ooh-packages-net-nego-rate"]';
  netNegoRateSymbol = `:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`;
  discount = '[data-automation="ooh-package-discount"]';
  flightDateStart = '[data-automation="ooh-package-flight-start-date"]';
  flightDateEnd = '[data-automation="ooh-package-flight-end-date"]';
  cycleType = '[data-automation="Select Cycle Type"]';
  NumberOfCycles = '[data-automation="ooh-package-num-of-cycles"]';
  totalMediaCost = '[data-automation="ooh-package-total-net-media-cost"]';
  netInstall = '[data-automation="ooh-package-cost-net-install"]';
  production = '[data-automation="ooh-package-cost-production"]';
  programCost = '[data-automation="ooh-package-total-program-cost"]';
  activeMonth = '.cad-month-calendar__day-item.cad-month-calendar__day-item--active-month';

  holdExpireDate = '[data-automation="ooh-package-hold-expiry-date"]';
  illuminated = '[data-automation="ooh-package-illuminated"]';
  illumYes = '[data-automation="ooh-package-illuminated-yes"] > .radio-button';
  illumNo = '[data-automation="ooh-package-illuminated-no"] > .radio-button';
  various =
    '[data-automation="ooh-package-illuminated-various"] > .radio-button';

  geoPath =
    '[data-automation="ooh-package-method-measurement-geopath"] > .radio-button';
  other =
    '[data-automation="ooh-package-method-measurement-other"] > .radio-button';

  Universe = '[data-automation="ooh-package-impressions-18"]';
  all = '[data-automation="ooh-package-impressions-18-to-49"]';

  NonGeopath = '[data-automation="ooh-package-non-geopath-measurement"]';
  TargetDemo = '[data-automation="ooh-package-impressions-target-demo"]';
  comment = '[data-automation="ooh-campaign-manage-form-name"]';
  browse = ':nth-child(3) > cad-button > .cad-button';

  import = '[data-automation="cad-link"]';
  downPackTemplate =
    '[data-automation="ooh-rfp-packages-frames-download-link"] > .cad-link > .cad-link__text';

  unitsPage = '[data-automation="cad-pagination__btn_next"]';

  deletaPackPopCancel = '[data-automation="popup_footer"] [view="secondary"]';
  deletaPackPopYes = '[data-automation="popup_footer"] [view="primary"]';

  viewResponse = '[data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button';
  viewRFP = '[data-automation="ooh-rfp-detail-action-cancel"] > .cad-button';
  viewResponseRFP = '[data-automation="ooh-rfp-response-action-view"] > .cad-button'

  error = '[data-automation="error"]'

  packtablerows = '[data-automation="rfp-response-frames-package-table"] .ag-pinned-left-cols-container .ag-row'
  invUnitsCount = 'section.ng-star-inserted > :nth-child(1) > .panel-head__text > .title';

  marketName = '.content-market-table__pl-0';
  marketDMA = '.content-market-table__tr > :nth-child(2)';
  marketFromDate = '.content-market-table__tr > :nth-child(3) > .ng-star-inserted';
  marketToDate = ':nth-child(4) > .ng-star-inserted';
  marketsTitle = '.campaign-market-view__header > .title > :nth-child(1)';
  marketCount = '.content-count';
  marketTable = 'table.table > tbody';

  demographicsTitle = '.col-md-8 > .title';
  primaryAudience = '.mb-20 > :nth-child(1) > .campaign-container__element__text';
  primaryAudienceTitle = '.mb-20 > :nth-child(1) > .campaign-container__element__label';
  secondaryAudienceTitle = ':nth-child(2) > .campaign-container__element__label';
  campaignDescription = ':nth-child(4) > .campaign-container__element > .campaign-container__element__text';
  attachmentsTitle = 'div.shared-attachment__header';
  numberOfAttachments = '.title_2 > span.title';
  commentTitle = ':nth-child(12) > .campaign-container__element > .title';
  inventoryTitle = '[value="Inventory"] > .button-toggle > a';
  mediaFormatTitle = '.campaign-container__media-formatwrap > .panel-head__text';
  unitsTitle = 'section.ng-star-inserted > :nth-child(1) > .panel-head__text';
  backBtn = '.rfp-container__header-back > .cad-button';
  heading = '.rfp-container__header__holder__wrapper-title';
  breadcrumbTitle = '.rfp-container__sticky-breadcrumb-title';
  responseUnitsTitle = 'rfp-response-frames > .rfp-container__body-title';
  responseUnitCount = '.rfp-container__body-title > span';
  responsePackageCount = '.col-md-8 > .ng-star-inserted';
  responsePackageRows = `[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`;
  unitTemplateMessage = '.rfp-container__body__sections__section__search-message';
  noUnitsMessage = '.rfp-container__body__sections__section-none-title';
  createPackage = '.pkg-btn > .cad-button';
  attachmentTitle = '.shared-attachment__header > .title_2';
  count = '.title_2 > .title';
  noAttachmentInfo = '.panel-head__beforecontent';
  addAttachment = '.row > cad-button > .cad-button';
  responseCommentsTitle = ':nth-child(5) > .rfp-container__body-title';
  commentsTextbox = '.rfp-container__body__sections__section-white-wrapper > .ng-valid';
  maxCharLabel = '.maxCharsLabel';
  searchByIdTxt = `.example__copy`;
  popupCloseButton = '[data-automation="popup_close"] > .icon';
  addByIdHeader = '.response__list__modal__header';
  popupSeachById = `.response__list__modal__search-field > cad-search-input >
  .cad-search > .cad-search__input > .ng-pristine`;
  popupSearchByIdInfo = '.response__list__modal__search-helptext';
  popupSearchMessage = '.response__list__modal__body-table-none-title';
  popupSearchByIdNote = '.response__list__modal__body-message';
  popupSearchByIdTextbox = `.response__list__modal__search-field > cad-search-input > .cad-search >
  .cad-search__input`;
  popupunitCount = '.response__list__modal__body > .ng-star-inserted > tbody';
  responsePackageList = `[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`;
  responseErrorInstructions = '.rfp-container__body__sections__section-error';
  packageError = '.rfp-response-packages-error';
  unsavedPopupTitle = '.unsaved-popup__title';
  unsavedPopupMessage = '.unsaved-popup__text > :nth-child(2)';
  unsavedPopupConfirmation = '.unsaved-popup__text > :nth-child(1)';
  responseFilterResults = '.cad-search__input';
  responseCollapsableErrorPanel = '.cad-collapsible-panel__head__custom-title > div';
  discountTitle = ':nth-child(4) > .mb-15';
  totalProgramCostTile = ':nth-child(15) > :nth-child(3) > .mb-15';
  commnetsTitle = ':nth-child(24) > .campaign-form__header > .title';
  allAdultsTitle = ':nth-child(22) > :nth-child(2) > .title';
  packageUnitsTitle = '.rfp-response-packages-title';
  weeklyNonGeoMeasurementTitle = ':nth-child(22) > .campaign-form__element > .title';
  methodolgoyOfMeasurementTitle = ':nth-child(21) > :nth-child(2) > .title';
  methodologyTitle = ':nth-child(20) > .campaign-form__header > .title';
  IlluminatedTitle = ':nth-child(21) > :nth-child(1) > .title';
  universeTitle = ':nth-child(22) > :nth-child(1) > .title';
  expiresTitle = ':nth-child(17) > .campaign-form__header > .title';
  holdExpirationDateTitle = ':nth-child(18) > .campaign-form__element > .title';
  expandErrorPanel = '.ng-tns-c68-22 > .icon';
  imageWithError = '[src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMCAxNyI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYiIgZD0iTTEzOCAxOTVoMTAwNHYxOTE5SDEzOHoiLz4KICAgICAgICA8ZmlsdGVyIGlkPSJhIiB3aWR0aD0iMTAxLjQlIiBoZWlnaHQ9IjEwMC43JSIgeD0iLS43JSIgeT0iLS4zJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMiIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxwYXRoIGlkPSJjIiBkPSJNMTM4IDE5NWgxMDA0djEzNzBIMTM4eiIvPgogICAgICAgIDxmaWx0ZXIgaWQ9ImQiIHdpZHRoPSIxMDAuMSUiIGhlaWdodD0iMTAwLjElIiB4PSIwJSIgeT0iMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iLTEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRJbm5lcjEiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIGsyPSItMSIgazM9IjEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dJbm5lcklubmVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTI1NDkwMTk2IDAgMCAwIDAgMC45MjU0OTAxOTYgMCAwIDAgMCAwLjkyNTQ5MDE5NiAwIDAgMCAxIDAiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8cGF0aCBpZD0iZSIgZD0iTTAgMGg5NjR2NjgzSDB6Ii8+CiAgICAgICAgPHBhdGggaWQ9ImciIGQ9Ik0wIDBoOTd2NTBIMHoiLz4KICAgICAgICA8ZmlsdGVyIGlkPSJmIiB3aWR0aD0iMTAxJSIgaGVpZ2h0PSIxMDIlIiB4PSItLjUlIiB5PSItMSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iLTEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRJbm5lcjEiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIGsyPSItMSIgazM9IjEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dJbm5lcklubmVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuODU0OTAxOTYxIDAgMCAwIDAgMC44NTQ5MDE5NjEgMCAwIDAgMCAwLjg1NDkwMTk2MSAwIDAgMCAwLjUgMCIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRjBGMEYwIiBkPSJNLTEwNDYtNDQ1SDIzNHYyMjQ0aC0xMjgweiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDQ2IC00NDUpIj4KICAgICAgICAgICAgPHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwNDYgLTQ0NSkiPgogICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNjIi8+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI2QpIiB4bGluazpocmVmPSIjYyIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBmaWxsPSIjRjdGN0Y3IiBkPSJNLTg4OC0xNzRINzZ2Nzk4aC05NjR6Ii8+CiAgICAgICAgPHVzZSBmaWxsPSIjRjdGN0Y3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODg4IC01OSkiIHhsaW5rOmhyZWY9IiNlIi8+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI2YpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEgLTE2KSIgeGxpbms6aHJlZj0iI2ciLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI2M0MTk2MiIgZD0iTTYuNSA3QzcuMzMgNyA4IDYuMzMgOCA1LjVTNy4zMyA0IDYuNSA0IDUgNC42NyA1IDUuNSA1LjY3IDcgNi41IDd6TTE4IDYuMTc1bC0zLjA5LTIuNDIxLTcuMDQgNy4zMzgtMy0yLjA4OEwyIDEyVjJoMTZ2NC4xNzV6TTE4IDE1SDJ2LS42MDFsMy4xMy0zLjI0NiAzIDIuMDc0TDE1LjA5IDYgMTggOC4yNlYxNXptMC0xNUgyQy45IDAgMCAuOSAwIDJ2MTNjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlYyYzAtMS4xLS45LTItMi0yeiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="]';
  addImagePopupTitle = '.response__header';
  productionTitle = ':nth-child(15) > :nth-child(2) > .title';
  productionSymbol = `:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`;
  packageCalanderDays = `.cad-month-calendar__header__icon--right > cad-icon > .icon`;
  cycleTypeDaily = ':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  noOfCyclesTitle = ':nth-child(12) > :nth-child(2) > .title';
  totalNetMediaCost = ':nth-child(12) > :nth-child(3) > .mb-15';
  programCosttitle = ':nth-child(14) > .campaign-form__header > .title';
  netInstallTitle = ':nth-child(15) > :nth-child(1) > .title';
  netInstallSymbol = `:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`;
  addImagePopupClose = 'cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon';
  addImagePopupDeleteExistingImage = '.response__body > cad-icon.ng-star-inserted > .icon > use';
  closeLeavePopup = 'cad-icon.ng-star-inserted > .icon > use';
  dropPictureMessage = '.uploader > .title_2';
  dropPictureInfo = '.title_6'
  templateTitle = '.mt-5';
  messageTitle = '.cad-toast__title';
  PopupAttachFile = 'cad-button > input[type="file"]';
  importFromFileInput = 'input[type="file"]';
  addImagePopupBrowse = '.uploader > :nth-child(3) > cad-button > .cad-button';
  filterResultsLabel = '.cad-search__input > .ng-pristine';
  unitsLable = 'rfp-response-frames > .rfp-container__body-title';
  deleteFirstUnit = '[row-index="0"] > .ag-cell > .icons > .trash';
  deleteUnit = '.ag-cell > .icons > .trash';
  deleteUnitFour = '[row-index="3"] > .ag-cell > .icons > .trash';
  deletePackUnits = '.ag-row-last > .ag-cell > .icons > .trash'
  responseUnitRows = '.ag-pinned-left-cols-container > .ag-row';
  commentsTxt = '.rfp-container__body__sections__section-white-wrapper';
  commentsCharLeft = '.maxCharsLabel';
  commentsTextArea = '.rfp-container__body__sections__section-white-wrapper > .ng-untouched';
  closePopUp = '[data-automation="popup_close"] > .icon > use';
  popupDescription = '.popup-description';
  packageGeneralInfoLabel = ':nth-child(1) > .campaign-form__header > .title';
  packageTypeLabel = '.cad-panel > :nth-child(2) > :nth-child(1) > .title';
  listItems = '.list-item';
  packageMarketLabel = ':nth-child(2) > :nth-child(2) > .title';
  marketListItem = '.list-item__text';
  packageSizeLabel = ':nth-child(2) > :nth-child(3) > .title';
  packageLocationLabel = ':nth-child(3) > :nth-child(1) > .title';
  errorMessage = '.rfp-container__body-message-error';
  activeDates = 'div.cad-month-calendar__day-item--active-month';
  packageRationaleLabel = ':nth-child(3) > :nth-child(2) > .title';
  pacakageNetRatesLabel = ':nth-child(5) > .campaign-form__header > .title';
  packageUnitsLabel = ':nth-child(6) > :nth-child(1) > .title';
  packageNetRatesLabel = ':nth-child(6) > :nth-child(2) > .title';
  packageNetNegotiatedRate = ':nth-child(6) > :nth-child(3) > .title';
  packageFlightDates = ':nth-child(8) > .campaign-form__header > .title';
  packageStartDate = ':nth-child(9) > :nth-child(1) > .title';
  packageEndDate = ':nth-child(9) > :nth-child(2) > .title';
  pacakageMediaCost = ':nth-child(11) > .campaign-form__header > .title';
  packageCycleType = ':nth-child(12) > :nth-child(1) > .title';
  deletePackage = `.rfp-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
  > .ag-body-viewport > .ag-pinned-right-cols-container > [row-index="0"] > .ag-cell > .icons > .trash`;
  editPackage = '[row-index="0"] > .ag-cell > .icons > .rfp-container__body-table__actions-edit';
  deletePackageTitle = '.popup-title';
  packageRows = `[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`;
  cycleTypeListItem = ':nth-child(3) > div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  netInstallCurrencySymbol = `:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
  > .cad-input-group__addon > .cad-input-group__addon-icon`;
  uploadMessage = '.cad-toast > .cad-toast__content';
  responseErrorMessage = '.rfp-response-packages-error';
  geopathID = 'tr >  :nth-child(2)';
  messageCloseButton = '.cad-toast > .cad-toast__actions > .cad-toast__button';
  deleteAll = '[data-automation="ooh-rfp-response-frames-delete-all"]>a';
  responseUnitsCount = '[data-automation="total"]';
  addByIdPopupTitle = '.modal-window-title';
  geopathIdCol = '[col-id="geopathPanelId"]';
  eighteenPlusImpsCol = '[col-id="adultEighteenPlusWeeklyImpression"]';
  packageEighteenPlusImpsCol = '[col-id="eighteenPlusWeeklyImpressions"]';
  addByIdSubTitle = '.response__list__modal__body-label';
  searchById = '.example__copy';
  searchButton = 'cad-button.ng-star-inserted > .cad-button';
  addByIdUnitsLabel = '.response__list__modal__body > .rfp-response-packages-title';
  selectedUnitsCount = '.response__list__modal__body > .rfp-response-packages-title > span';
  selectAll = '[data-automation="ooh-rfp-add-select-all"] > .cad-link > .cad-link__text';
  removeAll = '[data-automation="ooh-rfp-add-remove-all"] > .cad-link > .cad-link__text';
  addByIdTableHeaders = 'th';
  addButton = '[data-automation="ooh-rfp-add-select"]';
  frameTableHeaders = 'div[ref="headerRoot"]>div>div>div> div> div>div>[class="ag-header-cell-text"]';
  customTooltip = 'div.custom-tooltip';
  unitRows = '.ag-pinned-left-cols-container > .ag-row';
  unitIdCol = '[col-id="plantUnitId"]';
  auditedCol = '[col-id="audited"]';
  marketDescCol = '[col-id="marketRegion"]';
  formatCol = '[col-id="formatDescription"]';
  locationDesColNo = '[aria-colindex="7"]';
  zipCodeColNo = '[aria-colindex="8"]';
  rationaleColNo = '[aria-colindex="9"]';
  SizeColNo = '[aria-colindex="10"]';
  pixelSizeColNo = '[aria-colindex="11"]';
  noOfUnitsColNo = '[aria-colindex="12"]';
  faceColNo = '[col-id="facing"]';
  digitalDetailsColNo = '[aria-colindex="14"]';
  poiColNo = '[aria-colindex="15"]';
  distaoncePoiColNo = '[aria-colindex="16"]';
  latColNo = '[aria-colindex="17"]';
  longColNo = '[aria-colindex="18"]';
  rateCardColNo = '[col-id="rateCard"]';
  netNegoRateColNo = '[col-id="netNegotiatedRate"]';
  discountColNo = '[aria-colindex="21"]';
  startDateColNo = '[col-id="startDate"]';
  endDateColNo = '[col-id="endDate"]';
  cycleTypeColNo = '[col-id="cycleType"]';
  noOfCyclesColNo = '[aria-colindex="25"]';
  netInstallColNo = '[aria-colindex="27"]';
  productionCostColNo = '[aria-colindex="28"]';
  commentsColNo = '[aria-colindex="30"]';
  holdExpDateColNo = '[aria-colindex="31"]';
  materialShippingColNo = '[aria-colindex="32"]';
  postDateColNo = '[aria-colindex="33"]';
  takedownDateColNo = '[aria-colindex="34"]';
  a18ColNo = '[aria-colindex="35"]';
  targetDemoColNo = '[aria-colindex="36"]';
  weeklyNonGeopathColNo = '[aria-colindex="37"]';
  methodologyColNo = '[aria-colindex="38"]';
  illuminationColNo = '[aria-colindex="39"]';
  dropDownSelected = '.selected';
  editTextbox = 'input.ag-cell-editor-autocomplete-input';
  dropdownOptions = 'div.autocomplete';


  packUnitsCount = '.rfp-response-packages-title > span'
  packUnitsDeleteAll = '[data-automation="ooh-rfp-response-frames-delete-all"] > .cad-link'
  packUnitsRowsCount = `[data-automation="rfp-response-frames-package-table"] .ag-root-wrapper 
                      .ag-root-wrapper-body .ag-root .ag-body-viewport .ag-center-cols-clipper 
                      .ag-center-cols-container .ag-row`
  deleteConfPopupTitle = '.popup-title'
  deleteConfpopupmsg = '.popup-description'
  deleteConfpopupNo = '[data-automation="popup_footer"] .cad-button--secondary'
  deleteConfpopupYes = '[data-automation="popup_footer"] .cad-button--primary'
  editLastPack = '.ag-row-last > .ag-cell > .icons > .rfp-container__body-table__actions-edit'


  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  importFramesFromFile(filepath: string) {
    let filename = filepath.split("/")[filepath.split("/").length-1];
    cy.fixture(filepath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get(this.importFromFileInput).attachFile({
          fileContent,
          //fileName: "proposal_upload_template[Multiple-Clients].xlsm",
          fileName: filename,
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: filepath
        });
      }).wait(1000);
  }

  processData(value: string, key: string) {
    if (value === undefined) {
      return "";
    }
    switch (key) {
      case 'cost':
        if (value.length > 6) {
          value = value.substring(0, value.length - 6) + "," + value.substring(value.length - 6, value.length);
        }
        value = "$" + value;
        break;
      case 'upper':
        value = value.toUpperCase();
        break;
      case '2decimals':
        value = parseFloat(value).toFixed(2).toString();
        break;
      case 'numbersOnly':
        value = value.replace(/\,/gi, '');
        // value = value.replaceAll(',', '');
        if (!isANumber(value)) {
          value = '0';
        }
        break;
      case 'trim':
        value = value.trim();
        break;
      case 'tooltip':
        value = value.substring(0, value.indexOf(" for Unit ID"));
      default:
        break;
    }
    return value;
  }

  enterRequiredFileds(idsLen: number, splString: string) {
    for (var i = 0; i < idsLen; i++) {
      if (i == 0) {
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').eq(0).dblclick().wait(1000);
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').eq(0).click().clear().type(splString.substring(0, 10)).type('{enter}');
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').eq(0).should('contain', splString.substring(0, 10));
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').eq(0).dblclick().wait(500).clear().type(splString.substring(22, 35)).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').eq(0).should('contain', splString.substring(22, 35));
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').eq(0).dblclick().wait(500);
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).dblclick().wait(500).clear().type('100').focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).should('contain', '100');
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).dblclick().wait(500).clear().type('80').focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).should('contain', '80');
        
      }
      else {
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').eq(0).dblclick().wait(500).clear().type(splString.substring((i * 6), ((i * 2) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').eq(0).should('contain', splString.substring((i * 6), ((i * 2) * 6)));
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').eq(0).dblclick().wait(500).clear().type(splString.substring((i * 3), ((i * 3) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').eq(0).should('contain', splString.substring((i * 3), ((i * 3) * 6)));
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').eq(0).dblclick().wait(500);
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).dblclick().wait(500).clear().type('100').focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).should('contain', '100');
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).dblclick().wait(500).clear().type('80').focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).should('contain', '80');
      }

      // Add Number of Units
      cy.get('[row-index="' + i + '"] > [aria-colindex="12"]').eq(0).dblclick().type('1').type('{enter}');
    }
  }

  enterPackageRequiredFileds(idsLen: number, splString: string) {
    for (var i = 0; i < idsLen; i++) {
      if (i == 0) {
        cy.get('[row-index="' + i + '"] > [aria-colindex="14"]').eq(0).dblclick().wait(1000);
        cy.get('[row-index="' + i + '"] > [aria-colindex="14"]').eq(0).click().clear().type(splString.substring(0, 10)).type('{enter}');
        cy.get('[row-index="' + i + '"] > [aria-colindex="16"]').click();
        cy.get('[row-index="' + i + '"] > [aria-colindex="14"]').eq(0).should('contain', splString.substring(0, 10));
        cy.get('[row-index="' + i + '"] > [aria-colindex="15"]').eq(0).dblclick().wait(500).clear().type(splString.substring(22, 35)).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="16"]').click();
        cy.get('[row-index="' + i + '"] > [aria-colindex="15"]').eq(0).should('contain', splString.substring(22, 35));
        
      }
      else {
        cy.get('[row-index="' + i + '"] > [aria-colindex="14"]').eq(0).dblclick().wait(500).clear().type(splString.substring((i * 6), ((i * 2) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="16"]').click();
        cy.get('[row-index="' + i + '"] > [aria-colindex="14"]').eq(0).should('contain', splString.substring((i * 6), ((i * 2) * 6)));
        cy.get('[row-index="' + i + '"] > [aria-colindex="15"]').eq(0).dblclick().wait(500).clear().type(splString.substring((i * 3), ((i * 3) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="16"]').click();
        cy.get('[row-index="' + i + '"] > [aria-colindex="15"]').eq(0).should('contain', splString.substring((i * 3), ((i * 3) * 6)));
      }

      // Add Number of Units
      cy.get('[row-index="' + i + '"] > [aria-colindex="12"]').eq(0).dblclick().type('1').type('{enter}');
    }
  }

  enterRateCardAndNetNegotiableRate( idsLen: number, RateCard:string,  NetNogitateedRate:string){
    for (var i = 0; i < idsLen; i++) {
      if (i == 0) {
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).dblclick().wait(1000);
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).click().clear().type(RateCard).type('{enter}');
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).should('contain', RateCard);
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).dblclick().wait(500).clear().type(NetNogitateedRate).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).should('contain', NetNogitateedRate);
      }
      else {
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).dblclick().wait(500).clear().type(RateCard).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="19"]').eq(0).should('contain', RateCard);
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).dblclick().wait(500).clear().type(NetNogitateedRate).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="20"]').eq(0).should('contain', NetNogitateedRate);
      }
    }
  }  

  sendText(colno: string, element: string, str: string, val: string) {
    cy.get("[row-index='" + colno + "'] >" + element).dblclick().wait(500);
    cy.get("[row-index='" + colno + "'] >" + element).eq(0).dblclick().clear().type(str).type('{enter}');
    if (val != "") {
      cy.get("[row-index='" + colno + "'] >" + element).eq(0).should('have.text', val);
    }
  }
}

function isANumber(str: string) {
  return !/\D/.test(str);
}



