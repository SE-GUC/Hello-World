class Application {
    constructor(description, partner, id) {
        this.description = description;
        this.partner = partner;
        this.applicants = [];
        this.id =id;
        this.messages = [];
        
    };
}

module.exports = Application;