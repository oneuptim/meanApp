var movie = require('./controllers/MovieController.js');

module.exports = function(app) {
  console.log('Hitting routes on server!');
  // Show all
  app.get('/movies', function(req, res) {
    movie.index(req, res);
  })
  // Show one
  app.get('/movies/:id', function(req, res) {
    movie.show(req, res);
  })
  // Add New
  app.post('/movies', function(req, res) {
    movie.create(req, res);
  })
  // Update
  app.put('/movies/:id', function(req, res) {
    movie.update(req, res);
  })
  // Delete
  app.delete('/delete/:id', function(req, res) {
    movie.delete(req, res);
  })

};
