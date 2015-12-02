
var app = angular.module('app', ['ngRoute']);


app.controller('mainController', ['$http', '$location', '$scope',
function ( $http, $location, $scope) {

  $scope.login = function (user) {
    console.log(user);
    if (user) {
      console.log(user);
      if (user.username && user.password) {
        $http.post('/api/signin', user, function (res) {
          console.log(res.data);
        });
      }
    } else {
      $scope.signForm = true;
    }
  };

  $scope.articles = [
    {title: 'Poor design skills'},
    {title: 'Luana linda'},
    {title: 'I love angular'}

  ];


}]);
