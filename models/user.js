var CryptoJS = require("crypto-js")
var mongoose = require('./db')

var UserSchema = new mongoose.Schema({
    firstname: String, 
    lastname: String,
    email: String,
    password: String,
}, {
    versionKey: false
});

function hash(password) {
    return (CryptoJS.SHA256(password).toString());
}

// ---------------- Sign-up Page  ----------------
// Create a new account
UserSchema.statics.addUser = function(firstname, lastname, email, password) {
    return this.create(
        {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash(password)
        }
    );
}

// Get user by email
UserSchema.statics.getUserByEmail= function(email, callback){
    return this.find({email: email}
                ).exec(callback);
}

// ---------------- Sign-in Page ----------------
// Check validation
UserSchema.statics.validateUser = function(email, password, callback) {
    return this.find({email: email, 
                      password: hash(password)}
                    ).exec(callback);
}

UserSchema.statics.resetPassword = function(email, newPassword, callback){
    return this.updateOne(
                {email: email}, 
                {$set: {'password': hash(newPassword)}})
                .exec(callback);
}

// ---------------- User Page ----------------
// Get user information
UserSchema.statics.getUser = function(id, callback){
    return this.find({_id: id}, 
                     {firstname: 1, lastname: 1, email: 1}
                    ).exec(callback);
}

// Edit Profile
UserSchema.statics.updateUser = function(id, newFirstName, newLastName, newEmail, callback){
    return this.updateOne(
                    {_id: id}, 
                    {$set: {'firstname': newFirstName, 
                           'lastname': newLastName, 
                           'email': newEmail}
                    })
                .exec(callback);
}

// Change Password
UserSchema.statics.updatePassword = function(id, newPassword, callback){
    return this.updateOne(
                {_id: id}, 
                {$set: {'password': hash(newPassword)}})
                .exec(callback);
}


var User = mongoose.model('User', UserSchema, 'userlist');

module.exports = User;