class Consultant {
    constructor(id, workPosition,status) {
        this.status = status;
        this.id = id;
        this.boardMembers = [];
        this.events = [];
        this.workPosition = workPosition;
        this.partners = [];
        this.reports = [];
        this.acceptedConsultant = null;
    };
};

module.exports = Consultant;