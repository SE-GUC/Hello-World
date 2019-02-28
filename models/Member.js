class Member {
    constructor(name, age, mail, phone, userID,RMC,id) {
        this.name = name;
        this.age = age;
        this.mail = mail;
        this.phone = phone;
        this.userID = userID;
        this.RMC = RMC;
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