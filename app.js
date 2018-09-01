const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

var exphbs = require('express-handlebars');

const Review = mongoose.model('Review', {
  title: String
});
//
// let reviews = [
//   { title: "Greate Review" },
//   { title: "Next Review" },
// ]

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reveiws: reviews });
    })
    .catch(err => {
      console.log(err);
    });
});
