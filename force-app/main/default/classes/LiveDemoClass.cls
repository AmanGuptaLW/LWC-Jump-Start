public with sharing class LiveDemoClass {
    @AuraEnabled
    public static CONTACT fetchContactDetails(String recordId) {
        return [SELECT NAME FROM CONTACT WHERE Id =: recordId];
    }
}