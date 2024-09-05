var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/old_phone_deals', { useNewUrlParser: true }, function () {
  console.log('mongodb connected')
});

module.exports = mongoose;