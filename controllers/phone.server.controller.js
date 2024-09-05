var Phone = require("../models/phone")

module.exports.getSoldOutSoon = function(req, res){
    Phone.getSoldOutSoon(function(err, result){
		if (err){
			console.log("Cannot find sold out soon phone listings");
		}else{
			res.json(result);
		}
	})
}

module.exports.getBestSellers = function(req, res){
    Phone.getBestSellers(function(err, result){
		if (err){
			console.log("Cannot find best sellers");
		}else{
			res.json(result);
		}
	})
}

module.exports.getItemDetails = function(req, res){
	Phone.getDetails(req.params.id, function(err, result){
		if (err){
			console.log("No Details Found");
		}else{
			res.json(result);
		}	
	})
}

module.exports.getReviews = function(req, res){
	Phone.getReviews(req.params.uid, function(err, result){
		if (err){
			
			console.log("No Reviews Found");
		}else{
			res.send(result);
		}
	})
}

module.exports.getReviewsById = function(req, res){
	Phone.getReviewsById(req.params.id, function(err, result){
		
		if (err){
			console.log("No Reviews Found");
		}else{
			res.send(result);
		}
	})
}

module.exports.searchByTitle = function(req, res) {
	Phone.searchByTitle(req.params.title, function(err, result){
		if (err){
			console.log("title error");
		}else{
			res.json(result);
		}
	})
}

module.exports.getHighestPrice = function(req, res) {
	Phone.getHighestPrice(req.params.title, function(err, result){
		if (err){
			console.log("get highest price error");
		}else{
			res.json(result);
		}
	})
}

module.exports.searchAndFilter = function(req,res){
	Phone.filter(req.params.title, req.params.min, req.params.max, req.params.brand, function(err, result){
		if (err){
			console.log("filter error");
		}else{
			res.json(result);
		}
	})
}

module.exports.addReview = function(req, res){
	const { id, uid, rating, comment} = req.params;
	Phone.addReview(id, uid, rating, comment, function(err){
		if (err){
			res.send({ status: "error" });
		}else{
			res.send({ status: "ok" });
		}
	})
}

module.exports.showComment = function(req, res){
	if (req.query.hide === "true") {
		Phone.hideComment(req.params.id, req.params.uid, function(err) {
			if (err){
				res.send({ status: "error" });
			}else{
				res.send({ status: "ok" });
			}
		})
	} else {
		Phone.showComment(req.params.id, req.params.uid, function(err) {
			if (err){
				res.send({ status: "error" });
			}else{
				res.send({ status: "ok" });
			}
		})
	}
}

module.exports.findBySeller = function(req, res){
	Phone.getPhoneBySeller(req.params.uid, function(err, result) {
		if (err){
			console.log("Query Error");
		}else{
			res.json(result);
		}	
	})
}

module.exports.addListing = function (req, res) {
	const {title, brand, stock, seller, price} = req.params;	
	Phone.addListing(title, brand, stock, seller, price, function(err) {
		if (err){
			res.send({ status: "error" });
		} else {
			res.send({ status: "ok" });
	}	
	})
}

module.exports.deleteListing = function (req, res) {
	Phone.deleteListing(req.params.id, function(err) {
		if (err){
			res.send({ status: "error" });
		} else {
			res.send({ status: "ok" });
		}
	})
}

module.exports.manageListing = function(req, res) {
	if (req.query.disable === "false") {
		Phone.disableListing(req.params.id, function(err, result) {
		if (err){
			res.send({ status: "error" });
		}else{
			res.send({ status: "ok" });
		}		
	})
	} else {
		Phone.enableListing(req.params.id, function(err, result) {
			if (err){
				res.send({ status: "error" });
			}else{
				res.send({ status: "ok" });
			}		
		})
	}
}

module.exports.updateStock = function(req, res) {
	Phone.updateStock(req.params.id, req.params.stock, function(err, result){
		if(err) {
			res.send({status:"error"});
		} else {
			res.send({status: "ok"});
		}
	})
}