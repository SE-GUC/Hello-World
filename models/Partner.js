class Partner {
    constructor(workPosition, fieldOfWork, id) {
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