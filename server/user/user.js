let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
});
mongoose.model('User', UserSchema)

module.expors = mongoose.model('User')