
 var app = angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);





 app.controller('mainController', function ($scope) {

   $scope.sendName = function(name) {
     delete $scope[name];
    if (name == 'Luana') {
      $scope.delicia = 'OLÁ, DELÍCIA!!!!!!!';
    } else {
      $scope.delicia = "Ohh, it's you, " + name + ".";
    }
   };

 });
