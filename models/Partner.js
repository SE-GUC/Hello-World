class Partner {
    constructor(organizationID ,workPosition, fieldOfWork, id) {
        this.organizationID = organizationID;
        this.workPosition = workPosition;
        this.partners = [];
        this.boardMembers = [];
        this.events = [];
        this.fieldOfWork = fieldOfWork;
        this.pastProjects = [];
        this.feedback = [];
        this.id = id;
    };
}

module.exports = Partner;