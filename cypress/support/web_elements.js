const inputElement = {
    inputSelector : 'div[class=" inputter "]',
    disabledInputSelector : 'div[class=" inputter has-disabled "]',
    maskSelector : 'div[class=" inputter has-mask "]',
    dateSelector : 'div[class=" inputter date "]',
    radioSelector : 'div[class=" inputter radio has-disabled "]',
    searchSelector : 'div[class=" inputter search "]',
    checkboxSelector : 'div[class=" inputter checkbox has-disabled "]',
    helperSelector : 'div[class="helper"]',
    iconSelector : 'inputter-icon[class="icon"]',
    label : 'label[slot="label"]',
    labelSlot : 'slot[name="label"]',
    inputWrapper : 'div[class="wrapper"]',
    inputMaskSelector : 'div[class="input-mask"]',
    validationSelector : 'div[class="validation"]',
    messageSelector : 'div[class="message"]',
    headingSpan : 'span[class="input-heading"]',
    labelholder : 'span[class="label-holder"]',
    headingSlot : 'div[slot="heading"]',
};

const imageElement = {
    imageSelector : 'div[class=" image "]',
    backgroundImageSelector : 'div[class=" image is-background "]',
};

const formElement = {
    username : 'muon-inputter[name="username"]',
    useremail : 'muon-inputter[name="useremail"]',
    labelUserID : 'label[for="user-id"]',
    inputUserID : 'input[name="user-id"]',
    inputterCheckbox : 'muon-inputter[name="checkboxes"]',
    inputCheckbox : 'input[type="checkbox"]',
    dob : 'muon-inputter[name="dob"]',
    title : 'muon-inputter[name="title"]',
}

const cardElement = {
    header : 'div[class="header"]',
    footer : 'div[class="footer"]',
    content : 'div[class="content"]'
}


module.exports = {inputElement,imageElement,formElement,cardElement};