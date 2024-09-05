var express = require('express')
var controller = require('../controllers/phone.server.controller')
var router = express.Router();

router.get('/sold-out-soon', controller.getSoldOutSoon);
router.get('/best-seller', controller.getBestSellers);
router.get('/:id', controller.getItemDetails);
router.get('/:uid/reviews', controller.getReviews);
router.get('/:id/reviews/filter', controller.getReviewsById);
router.get('/search/:title', controller.searchByTitle);
router.get('/search/:title/max-price', controller.getHighestPrice);
router.get('/search/:title/:min/:max/:brand', controller.searchAndFilter);
router.get('/:id/:uid/:rating/:comment', controller.addReview);
router.get('/seller/:uid', controller.findBySeller);
router.get('/add/:title/:brand/:stock/:seller/:price', controller.addListing);
router.get('/manage/:id', controller.manageListing);
router.get('/delete/:id', controller.deleteListing);
router.get('/:id/:uid', controller.showComment);
router.get('/update/:id/:stock',controller.updateStock);
module.exports = router;