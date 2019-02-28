class Member {
    constructor(name, age, email, phone, id) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
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