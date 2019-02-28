class Application {
    constructor(number, partner,id,consultancy) {
        this.number = number;
        this.partner = partner;
        this.id = id;
        this.messages = [];
        this.applicants = [];
        this.consultancy = consultancy;
    };
}

module.exports = Application;