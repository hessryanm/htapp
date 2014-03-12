var htApp = angular.module('htApp', [
  'ngRoute',
  'htAppControllers'
]);
 
htApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'templates/users.html',
        controller: 'usersCtrl'
      }).
      when('/assignments', {
        templateUrl: 'templates/assignments.html',
        controller: 'assignmentsCtrl'
      }).
      when('/collect-reports', {
        templateUrl: 'templates/collect-reports.html',
        controller: 'collectReportsCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);