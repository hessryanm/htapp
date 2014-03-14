app.controller('UploadAssignmentsCtrl', function ($scope, $http) {
	$scope.uploadCSV = function (form) {
		var assignmentsCSV = document.getElementById('assignmentsCSV');
		console.log(assignmentsCSV.files);

		console.log(form);
		
	}
})