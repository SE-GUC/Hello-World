class Organization {
    constructor(name, address, mail, phone, userID ,id) {
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.address = address;
        this.userID = userID;
        this.id = id;
    };
};

module.exports = Organization;