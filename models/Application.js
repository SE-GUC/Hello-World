class Application {
    constructor(description, partner, id, needConsultancy) {
        this.description = description;
        this.partner = partner;
        this.applicants = [];
        this.id =id;
        this.messages = [];
        this.consultant = null;
        this.needConsultancy = needConsultancy;
        this.reviewed = false;
    };
}

module.exports = Application;