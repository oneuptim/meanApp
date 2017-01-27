/**
 * @ngdoc overview
 * @name meanApp
 * @description
 * # meanApp
 *
 * Main module of the application.
 */

 ///////////////////////////////////////////////////////////////////////////////
 //                              ROUTES                                      //
 /////////////////////////////////////////////////////////////////////////////

var meanApp = angular.module('meanApp', ['ngRoute']);
  meanApp.config(function ($routeProvider) {
    console.log('meanApp config reached');
  //   // RestangularProvider.setBaseUrl('http://localhost:8000');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        // controllerAs: 'main'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        // controllerAs: 'movies'
      })
      .when('/new', {
        templateUrl: 'views/new-movie.html',
        controller: 'NewMovieCtrl',
        // controllerAs: 'movies'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'editMovieCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'editMovieCtrl'
      })
      .when('/delete/:id', {
        templateUrl: 'views/delete.html',
        controller: 'editMovieCtrl',
        // controllerAs: 'movies'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //                              FACTORIES                                   //
  /////////////////////////////////////////////////////////////////////////////

  meanApp.factory('MoviesFactory', function($http) {
      console.log('Movies Factory Started');

      var factory = {};

      factory.jenny = function(callback) {
        $http.get('/movies').then(function(res) {
          if (callback && typeof callback === "function") {
            callback(res.data);
          }
        });
      };

      factory.create = function(newMovie, callback) {
        $http.post('/movies', newMovie).then(function(res) {
          // console.log(res, "%%%%%%%%%%%%%%%%%%%%%%%");
          if (callback && typeof callback === "function") {
            callback(res.data);
            // console.log(res.config, "This is res.config from New Movies Factroy!");
          }
        });
      };

      factory.show = function(id, callback) {
          $http.get('/movies/'+id).then(function(res) {
            if (callback && typeof callback == 'function') {
              callback(res.data);
            }
          })
        }

        factory.update = function(movie, callback) {
          $http.put('/movies/'+movie._id, movie).then(function(res) {
            callback(res.data);
          })
        }

      factory.delete = function(movie, callback) {
        $http.delete('/delete/'+movie._id).then(function(res) {
            callback(res.data);
        });
      };

      return factory;
  });


  ///////////////////////////////////////////////////////////////////////////////
  //                              CONTROLLERS                                 //
  /////////////////////////////////////////////////////////////////////////////

  meanApp.controller('MainCtrl', function() {
    console.log('MainCtrl Started');
  });

  meanApp.controller('MoviesCtrl', ['$scope', 'MoviesFactory','$location', function($scope, MoviesFactory, $location) {
    console.log('Movies Ctrl Started');
    MoviesFactory.jenny(function(data) {
      $scope.movies = data;
    });

    MoviesFactory.show(function(data) {
      $scope.movie = data;
    });

  }]);

  meanApp.controller('NewMovieCtrl', function($scope, MoviesFactory, $location) {
    console.log("New movie Ctrl, hit!");
    $scope.create = function() {
      MoviesFactory.create($scope.newMovie, function(data){
        if (data.errors) {
          $scope.errors = data.errors;
        } else {
          $location.url('/movies');
        }
      })
    }
    console.log('MainCtrl Started');
  });



  meanApp.controller('editMovieCtrl', ['$scope', 'MoviesFactory','$location', '$routeParams', function($scope, MoviesFactory, $location, $routeParams) {
  console.log('Edit Movies Ctrl Started');

  MoviesFactory.show($routeParams.id, function(data) {
    console.log($routeParams.id, "<<<<<<<<<<<<<<<<<<<<<");
    $scope.movie = data;
  })

  $scope.update = function() {
   MoviesFactory.update($scope.movie, function(data) {
     $location.url('/movies');
   })
  }

  $scope.delete = function(movie) {
    MoviesFactory.delete(movie, function(data) {
      $location.url('/movies');
    })
  }

}]);
