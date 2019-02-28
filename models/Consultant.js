class Consultant {
    constructor(organizationID, workPosition,id) {
        this.organizationID = organizationID;
        this.boardMembers = [];
        this.events = [];
        this.workPosition = workPosition;
        this.partners = [];
        this.reports = [];
        this.id = id;
        this.acceptedConsultant = null;
    };
};

module.exports = Consultant;