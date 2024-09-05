var mongoose = require('./db')

var PhoneSchema = new mongoose.Schema({
    title: String, 
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews:[{
        reviewer: String,
        rating: Number,
        comment: String,
        hidden: String,
    }],
    disabled: String,
}, {
    versionKey: false
});

//---------------- Main Page - "Home" State ----------------
// Find phone listings that have the least quantity available
PhoneSchema.statics.getSoldOutSoon = function(callback){
	return this.find(
                    {disabled: {$exists:false},
                     stock: {$gt:0}
                    })
                .sort({"stock": 1})
                .limit(5)
                .exec(callback);
}

// Find phone listings that have the highest average rating
PhoneSchema.statics.getBestSellers = function(callback){
	return this.aggregate([
        {$addFields: {averageRating: {$round:[{$avg: "$reviews.rating"}, 1]}, arrayLength: {$size: '$reviews'}}},
        {
            $match: {
              arrayLength: {$gte: 2},
              disabled: { $exists: false }
            }
          },
        {$sort: {averageRating: -1}},
        {$limit: 5}])
        .exec(callback);
}

//---------------- Main Page - "Search" State ----------------
// Find phone listings that match the search word
PhoneSchema.statics.searchByTitle = function(searchWord, callback){
    return this.find(
                    {
                        disabled: {$exists:false}, 
                        title: {$regex: searchWord, $options: "$i"}
                    })
                .exec(callback);
            }

// find the highest priced based on the search word
PhoneSchema.statics.getHighestPrice = function(searchWord, callback){
    return this.find({title: {$regex: searchWord, $options: "$i"},
                      disabled: {$exists: false}})
                .sort({'price': -1})
                .limit(1)
                .exec(callback)
}

//Filter by title, brand and price
PhoneSchema.statics.filter = function(searchWord, min, max, brand, callback){
    if ( brand === "Brands"){
        return this.find(
            {
            disabled: {$exists: false}, 
            title: {$regex: searchWord, $options: "$i"},
            price: { $gte: min, $lte: max }
        }).exec(callback);
    }
    return this.find(
        {
        disabled: {$exists: false}, 
        title: {$regex: searchWord, $options: "$i"},
        brand: brand,
        price: { $gte: min, $lte: max }
    })
    .exec(callback);
}

//---------------- Main Page - "Item" State ----------------
// Find selected phone listing details
PhoneSchema.statics.getDetails = function(id, callback){
    return this.find({_id: id}).exec(callback);
}    

// Add review
PhoneSchema.statics.addReview = function(id, uid, rating, comment, callback) {
    return this.updateOne(
        {_id: id},
        {$push: {"reviews": {
            reviewer: uid,
            rating: rating,
            comment: comment, 
        }
        }}
    ).exec(callback);
}

// Find shown reviews
PhoneSchema.statics.getReviews = function(uid, callback){
    return this.aggregate(
        [ {$match:{ seller: uid }},
          { $project: {
            title: 1,
            reviews: { 
                $filter: { 
                    input: "$reviews", 
                    as: "review", 
                    cond: { $eq: [{ $type: "$$review.hidden" }, "missing"] } 
                } 
            }
         } 
        } ]).exec(callback);
}

PhoneSchema.statics.getReviewsById = function(id, callback) {
    return this.aggregate(
        [ { $match: { _id: mongoose.Types.ObjectId(id) } }, 
            { $project: {
                reviews: { 
                    $filter: { 
                        input: "$reviews", 
                        as: "review", 
                        cond: { $eq: [{ $type: "$$review.hidden" }, "missing"] } 
                    } 
                }
             } 
            }]).exec(callback);
}


// Hide Comment
PhoneSchema.statics.hideComment = function(id, uid, callback){
    return this.updateOne({_id: id, "reviews.reviewer": uid},
            {$set: {"reviews.$.hidden": ''}})
    .exec(callback);
}

// Show Comment
PhoneSchema.statics.showComment = function(id, uid, callback){
    return this.updateOne({_id: id, "reviews.reviewer": uid},
            {$unset: {"reviews.$.hidden": ''}})
    .exec(callback);
}

//---------------- Checkout Page ----------------
// Find phone listings by seller
PhoneSchema.statics.getPhoneBySeller = function(uid, callback){
    return this.find({seller: uid}).exec(callback);
}

// Update Stock
PhoneSchema.statics.updateStock = function(id, stock, callback) {
    return this.updateOne(
        {_id: id},
        {$set: {'stock': stock}}
    ).exec(callback);
}

//---------------- User Page - Manage Listings----------------
// Add a listing
PhoneSchema.statics.addListing = function(title, brand, stock, seller, price){
    return this.create({
        title: title, 
        brand: brand,
        stock: stock,
        seller: seller,
        price: price
      })
}

// Disable a listing
PhoneSchema.statics.disableListing = function(id, callback){
    return this.updateOne(
        {_id: id},
        {$set: {'disabled': ''}}
    ).exec(callback);
}

// Enable a listing
PhoneSchema.statics.enableListing = function(id, callback){
    return this.updateOne(
        {_id: id},
        {$unset: {'disabled': ''}}
    ).exec(callback);
}

// Remove a listing
PhoneSchema.statics.deleteListing = function(id, callback){
    return this.deleteOne(
        {_id: id}
    ).exec(callback);
}

//---------------- User Page - View Comments----------------
// Find comments for each phone listings
PhoneSchema.statics.getComments = function(uid, callback){
    return this.find(
        {seller: uid}, {reviews: 1}
    ).exec(callback);
}

var Phone = mongoose.model('Phone', PhoneSchema, 'phonelisting');

module.exports = Phone;