class Member {
    constructor(name, age, email, phone,rmasterc, id) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.rmasterc = [];
        this.skills = [];
        this.interests = [];
        this.pastEvents = [];
        this.tasksCompleted = [];
        this.reviews = [];
        this.certificates = [];
        this.masterclasses = [];
        this.id = id;
    };
};

module.exports = Member;