var app = angular.module("HTapp", ['ngRoute']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true)
		$routeProvider
		.when('/', {
			controller:'AssignmentCtrl',
			templateUrl:'templates/assignments.html'
		})
		.when('/stuff', {
			controller:'StuffCtrl',
			templateUrl:'templates/stuff.html'
		})
		.when('/uploadassignments', {
			controller:'UploadAssignmentsCtrl',
			templateUrl:'templates/uploadassignments.html'
		})
		.otherwise({
			redirectTo:'/'
		});
}])