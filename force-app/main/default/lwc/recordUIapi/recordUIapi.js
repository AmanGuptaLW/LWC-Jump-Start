import { LightningElement, api, track, wire } from 'lwc';
import { getRecord, getFieldValue, updateRecord } from "lightning/uiRecordApi";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import CONTACT from "@salesforce/schema/Contact";
import NAME from "@salesforce/schema/Contact.Name";
import FIRST_NAME from "@salesforce/schema/Contact.FirstName";
import LAST_NAME from "@salesforce/schema/Contact.LastName";
import ID_FIELD from "@salesforce/schema/Contact.Id";
import fetchContactDetails from '@salesforce/apex/LiveDemoClass.fetchContactDetails';

export default class HelloWorld extends LightningElement {
    @api recordId;
    objectName = 'Contact';
    contactObj = {};

    // contactName;

    // @wire(getObjectInfo, { objectApiName: CONTACT })
    // contactObj({data, error}) {
    //     console.log('data: ', data);
    //     console.log('error:', error);
    // }

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME, FIRST_NAME, LAST_NAME],
    })
    contact;

    get contactFirstName() {
        console.log(this.contact);
        // return this.contact.data && this.contact.data.fields.Name.value;
        return getFieldValue(this.contact.data, FIRST_NAME);
    }

    get contactLastName() {
        console.log(this.contact);
        // return this.contact.data && this.contact.data.fields.Name.value;
        return getFieldValue(this.contact.data, LAST_NAME);
    }

    handleValueChange(event) {
        console.log('handleValueChange', event.target.value);
        this.contactObj[event.target.name] = event.target.value;
        console.log(' --> ', this.contactObj);
    }

    saveContact() {
        console.log('saveContact');
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[FIRST_NAME.fieldApiName] = this.contactObj[FIRST_NAME.fieldApiName];
        fields[LAST_NAME.fieldApiName] = this.contactObj[LAST_NAME.fieldApiName];

        const recordInput = { fields };
        console.log('recordInput: ', recordInput);
        updateRecord(recordInput)
            .then(() => {
                alert('Contact Updated');
                // Display fresh data in the form
                return true; //refreshApex(this.contact);
            })
            .catch((error) => {
                alert('Error');
                // this.dispatchEvent(
                //     new ShowToastEvent({
                //         title: "Error creating record",
                //         message: error.body.message,
                //         variant: "error",
                //     }),
                // );
            });
    }


    // constructor() {
    //     super();
    //     // This is usually used to defined default values
    // }

    connectedCallback() {
        // The CMP is loaded on the DOM
        // alert('I am now Loading the CMP' + this.recordId);
        // fetchContactDetails({
        //     recordId: this.recordId
        // }).then(result => {
        //     console.log('result', result);
        //     this.contactName = result.Name;
        // }).catch(error => {
        //     console.log('error', error);
        // })
    }

    renderedCallback() {
        // This function is called everytime a UI cmp is refreshed

    }

    disconnectedCallback() {
        // This function is called when the UI is destroyed / Closed
    }
}