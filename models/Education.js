class Education {
    constructor(organizationID,id) {
        this.organizationID = organizationID;
        this.courses = [];
        this.trainers = [];
        this.certificates = [];
        this.trainigPrograms = [];
        this.id = id;
    };
}

module.exports = Education;