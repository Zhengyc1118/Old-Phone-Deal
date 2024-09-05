var User = require("../models/user")

module.exports.getUser = function(req, res){
	User.getUser(req.params.id, function(err, result){
		if (err){
			console.log("No User Found");
		}else{
			res.json(result[0]);
		}
	})
}

module.exports.getUserByEmail = function(req, res){
	User.getUserByEmail(req.params.email, function(err, result){
		if (err){
			console.log("No User Found");
		}else{
			res.json(result);
		}
	})
}

module.exports.validateUser = function(req, res) {
	User.validateUser(req.params.email, req.params.password, function(err, result) {
		if (err){
			console.log("Error");
		}else{
			res.json(result);
		}	
	})
}

module.exports.addUser = function(req, res){
	const { firstname, lastname, email, password } = req.params;
	try {
		User.addUser(firstname, lastname, email, password);
		res.send({ status: "ok" });
	} catch (error){
		res.send({ status: "error" });
	}
}

module.exports.editProfile = function(req, res) {
	User.updateUser(req.params.id, req.params.firstname, req.params.lastname, req.params.email, function(err, result) {
		if (err){
			res.send({ status: "error" });
		}else{
			res.send({ status: "ok" });
		}		
	})
}

module.exports.changePassword = function(req, res) {
	User.updatePassword(req.params.id, req.params.newPassword, function(err, result) {
		if (err){
			res.send({ status: "error" });
		}else{
			res.send({ status: "ok" });
		}		
	})
}

module.exports.resetPassword = function(req, res) {
	User.resetPassword(req.params.email, req.params.newPassword, function(err, result) {
		if (err){
			res.send({ status: "error" });
		}else{
			res.send({ status: "ok" });
		}		
	})
}