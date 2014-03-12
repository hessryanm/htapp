var htAppControllers = angular.module('htAppControllers',[]);

htAppControllers.controller('assignmentsCtrl', ['$scope', function($scope){
	$scope.controllerCheck = 'assignments';
	$scope.assignments = [
		{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 1",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 2",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 3",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 4",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 5",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 6",householdPhone:"801-380-8916",householdEmail:"fubeca37@yahoo.com",},
		{}];

	var indexedCompanionships =[];

	$scope.assignmentsToFilter = function (household) {
		var companionshipID = household.compID;
		return companionshipID;
	}


}]);