(function () {
    const mockContacts = [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Cleese",
            "dob": "1939-10-27"
        },
        {
            "id": 2,
            "firstName": "Eric",
            "lastName": "Idle",
            "dob": "1943-03-29"
        }
    ];
    function contactsService() {
        this.get = new Promise(resolve => {
            resolve(mockContacts);
        });
    }

    window.services.contacts = new contactsService();
})();