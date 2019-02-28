
class User {
    constructor(recommendedMS,username, password, id,masterclasses) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.recommendedMS = [];
    };
}

module.exports = User

