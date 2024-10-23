class UserProfile {
    constructor(user_id, name, profile_pic, email, password, preferences, created_at = new Date(), updated_at = new Date()) {
        this.user_id = user_id;
        this.name = name;
        this.profile_pic = profile_pic;
        this.email = email;
        this.password = password;
        this.preferences = preferences;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    updateProfile(details) {
        Object.assign(this, details);
        this.updated_at = new Date();
    }

    toJSON() {
        return {
            user_id: this.user_id,
            name: this.name,
            profile_pic: this.profile_pic,
            email: this.email,
            password: this.password,
            preferences: this.preferences,
            created_at: this.created_at.toISOString(),
            updated_at: this.updated_at.toISOString(),
        };
    }
}

module.exports = UserProfile;
