const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    });
});

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/reviews/${review._id}');
  }).catch((err) => {
    console.log(err.message);
  });
});

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review });
  }).catch((err) => {
    console.log(err.message);
  });
})
