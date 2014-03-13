app.controller("AssignmentCtrl", function ($scope, $http) {
	
	var assignments = [
	{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 1",householdPhone:"801-380-8916",householdEmail:"1@yahoo.com",},
	{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 2",householdPhone:"801-380-8916",householdEmail:"2@yahoo.com",},
	{quorum:"Elders",htDistrict:"1",supervisor:"Hess, Isaac",compID:"360",ht1:"Taylor, Eric",ht1Phone:"801-623-1245",ht1Email:"ericmatthewtaylor@gmail.com",ht2:"Roberts, Micah",ht2Phone:"435-632-6559",ht2Email:"hacim-backwards@yahoo.com",household:"Household, Number 3",householdPhone:"801-380-8916",householdEmail:"3@yahoo.com",},
	{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 4",householdPhone:"801-380-8916",householdEmail:"4@yahoo.com",},
	{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 5",householdPhone:"801-380-8916",householdEmail:"5@yahoo.com",},
	{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"382",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 6",householdPhone:"801-380-8916",householdEmail:"6@yahoo.com",},
	{quorum:"Elders",htDistrict:"2",supervisor:"Lewis, James",compID:"384",ht1:"Jones, Bob",ht1Phone:"801-555-9294",ht1Email:"thebobjones@gmail.com",ht2:"Kennedy, John",ht2Phone:"435-555-2341",ht2Email:"jfk@yahoo.com",household:"Household, Number 7",householdPhone:"801-380-8916",householdEmail:"7@yahoo.com",},
	];

	$scope.companionships = transformData(assignments);

	console.log($scope.companionships);


})

function transformData(assignments) {
	var companionships = [];
	var compIDs = buildIDArray(assignments);
	for (var i=0; i<compIDs.length; i++) {
		var currentCompID = compIDs[i];
		var formattedComp = buildSingleComp(assignments, currentCompID);
		companionships.push(formattedComp);
	}
	return companionships;
}

//Create array of unique comp IDs in the assignments list
function buildIDArray(assignments) {
	var compIDs = [];
	for (var i=0; i<assignments.length; i++) {
		var currentID = assignments[i].compID;
		if (compIDs.indexOf(currentID) < 0) {
			compIDs.push(currentID);
		}
	}
	return compIDs;
}

//Using array of unique comp IDs, create single array containing assignments with just that comp iD
function buildSingleComp(assignments, currentCompID) {
	var singleCompArray = buildSingleCompArray(assignments, currentCompID);
	var formattedComp = buildCompObject(singleCompArray);
	return formattedComp;
}

function buildSingleCompArray(assignments, currentCompID) {
	var singleCompArray = [];
	for (var j=0; j<assignments.length; j++) {
		var currentID = assignments[j].compID;		
		if(currentID == currentCompID) {
			singleCompArray.push(assignments[j]);
		}
	}
	return singleCompArray;
}

function buildCompObject(singleCompArray) {
	var singleCompObject = {
		quorum: singleCompArray[0].quorum,
		htDistrict: singleCompArray[0].htDistrict,
		supervisor: singleCompArray[0].supervisor,
		compID: singleCompArray[0].compID,
		ht: [],
		households: [],
	};
	
	//Add array of home teachers
	if (singleCompArray[0].ht1) {singleCompObject.ht.push(singleCompArray[0].ht1);}
	if (singleCompArray[0].ht2) {singleCompObject.ht.push(singleCompArray[0].ht2);}
	if (singleCompArray[0].ht3) {singleCompObject.ht.push(singleCompArray[0].ht3);}

	//Add home teaching families
	for (var i=0; i<singleCompArray.length; i++) {
		var index = "hh" + (i + 1);
		var household = {
			name: singleCompArray[i].household,
			phone: singleCompArray[i].householdPhone,
			email: singleCompArray[i].householdEmail,
		};
		singleCompObject.households.push(household);
	}

	return singleCompObject;
}

/*
	1. Make separate arrays for each companionship that has each object
	2. Loop through each of those arrays, creating an object that has the items I need (households, etc.)
	3. Once completed, push that final object to master array.

*/