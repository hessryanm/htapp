var htApp = angular.module('htApp', [
  'ngRoute',
  'htAppControllers'
]);
 
htApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'usersCtrl'
      }).
      when('/assignments', {
        templateUrl: 'partials/assignments.html',
        controller: 'assignmentsCtrl'
      }).
      when('/collect-reports', {
        templateUrl: 'partials/collect-reports.html',
        controller: 'collectReportsCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);