
var app = angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);


app.config( function($httpProvider, jwtInterceptorProvider, authProvider) {
    authProvider.init({
      domain: 'rodmentou.auth0.com',
      clientID: 'PBsg2KM98opRnlkfNeWWBVdrxKnGnMn8'
    });
});

app.run(function($rootScope, auth, store, jwtHelper) {
  auth.hookEvents();
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show Login page or use the refresh token to get a new idToken
      }
    }
  });
});


app.controller('mainController', function (auth, $location, store, $scope, jwtHelper) {
  var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';

  var tokenPayload = jwtHelper.decodeToken(expToken);

   $scope.login = function() {
     auth.signin({}, function (profile, id_token, access_token, state, refresh_token) {
       store.set('profile', profile);
       store.set('token', id_token);
       $location.path('/');
     }, function () {
       // TODO Handle when login fails
     });
   };


   $scope.sendName = function(name) {
     delete $scope[name];
    if (name == 'Luana') {
      $scope.delicia = 'OLÁ, DELÍCIA!!!!!!!';
    } else {
      $scope.delicia = "Ohh, it's you, " + name + ".";
    }
   };
});

app.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
      // Error callback
    });
  };

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };

  if (store.get('profile')){
  $scope.test = store.get('profile');
  $http.post('https://rodmentou.auth0.com/oauth/access_token',
  {
    client_id: 'PBsg2KM98opRnlkfNeWWBVdrxKnGnMn8',
    access_token: $scope.test.identities[0].access_token,
    connection: 'google-oauth2',
    scope: 'openid profile'
  })
  .then(
    function (res) {
      console.log(res.data);
      $location.path('/home');
    }, function (res) {

  });

  $http.get('https://rodmentou.auth0.com/userinfo',
    { Authorization: 'Bearer ' + $scope.test.identities[0].access_token})
    .then ( function (res) {
      console.log(res.data);
    }, function (res) {

    });

};

}]);
