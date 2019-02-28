class Task {
    constructor(levelOfCommitment, experienceLevel, setOfSkills, monetaryCompensation, id) {
        this.levelOfCommitment = levelOfCommitment;
        this.experienceLevel = experienceLevel;
        this.setOfSkills = setOfSkills;
        this.monetaryCompensation = monetaryCompensation;
        this.id = id;
        this.applicants = [];
        this.acceptedApplicants = [];
    };
};

module.exports = Task;