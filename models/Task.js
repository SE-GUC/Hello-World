class Task {
    constructor(app, number, id) {
        this.app = app;
        this.number = number;
        this.id = id;
        this.applicants = [];
    };
}

module.exports = Task;