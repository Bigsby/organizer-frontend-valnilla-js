class contacts extends vm {
    constructor(container, services) {
        super(container, services);
        this.service = this.getService("contacts");
        this.contactsContainer = this.getElement("#contactsContainer");
    }

    getFullName(contact) {
        return `${contact.firstName} ${contact.lastName}`;
    }

    innerInitialize() {
        this.service.get.then(contacts => {
            contacts.forEach(contact => {
                this.getTemplate("contacts-item").then(contactItemTemplate => {
                    contactItemTemplate.querySelector(".fullName").innerText = this.getFullName(contact);
                    this.contactsContainer.appendChild(contactItemTemplate);
                });
            });
        });
    }
}