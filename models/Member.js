class Member {
    constructor(name, age, email, phone,rmasterc, id) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.setOfSkills = [];
        this.interests = [];
        this.pastEvents = [];
        this.tasksCompleted = [];
        this.reviews = [];
        this.certificates = [];
        this.masterclasses = [];
        this.id = id;
        this.recommendedMasterclasses = [];
        this.notifications = [];
    };
};

module.exports = Member;