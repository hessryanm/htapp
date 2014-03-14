app.controller("AssignmentCtrl", function ($scope, $http) {
	
	$http.get('/assignments')
	.then(function(response) {
		var unsortedAssignments = response.data
		$scope.assignments = unsortedAssignments.sort(sort);
		$scope.districts = listUniqueValues($scope.assignments, "htDistrict");
		console.log($scope.districts);
		console.log($scope.assignments);
	})
	
})

function listUniqueValues(array, key) {
	var uniqueValues = [];
	for (var i=0; i<array.length; i++) {
		var currentValue = array[i][key];
		if (uniqueValues.indexOf(currentValue) < 0) {
			uniqueValues.push(currentValue);
		}
	}
	uniqueValues = uniqueValues.sort();
	return uniqueValues;
}


function sort(a,b) {
	if(a.compID > b.compID)
		return 1;
	if(a.compID < b.compID)
		return -1;
	return 0;
}