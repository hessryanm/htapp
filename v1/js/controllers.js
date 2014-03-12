var htAppControllers = angular.module('htAppControllers',[]);

htAppControllers.controller('usersCtrl', ['$scope', function($scope){
	$scope.controllerCheck = 'users';

}]);

htAppControllers.controller('assignmentsCtrl', ['$scope', function($scope){
	$scope.controllerCheck = 'assignments';

}]);

htAppControllers.controller('collectReportsCtrl', ['$scope', function($scope){
	$scope.controllerCheck = 'collecting reports';

}]);