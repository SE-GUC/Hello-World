class Application {
    constructor(description, partner, id, needConsultancy) {
        this.description = description;
        this.partner = partner;
        this.applicants = [];
        this.id =id;
        this.messages = [];
        this.acceptedConsultant = null;
        this.needConsultancy = needConsultancy;
    };
}

module.exports = Application;