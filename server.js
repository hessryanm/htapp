var express = require("express");
var http = require("http");
var connect = require("connect");
var q = require("q");
var r = require("rethinkdb");
var fs = require("fs");

var app = express();

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    r.dbCreate('htapp').run(connection, function(err, result) {

	    r.db('htapp').tableCreate('assignments').run(connection, function(err, result) {
			})    		
		})
	})

app.use(connect.static(__dirname + '/public'))
app.use(express.bodyParser())

app.get("/json", function(request, response) {
	console.log("/json");

	r.db('test').table('authors').run(connection, function(err, cursor) {
	    if (err) throw err;
	    cursor.toArray(function(err, result) {
	        if (err) throw err;
	        response.send(JSON.stringify(result, null, 2));
	    });
	});
	
})

app.get("/assignments", function(request, response) {
	console.log("/assignments");
	r.db('htapp').table('assignments').run(connection, function(err, cursor) {
	    if (err) throw err;
	    cursor.toArray(function(err, result) {
	        if (err) throw err;
	        response.send(result);
	    });
	});

})

app.post("/post", function(req, res, next) {next();}, function(request, response) {
	fs.readFile(request.files.csvform.ws.path, "utf8", function (err, data) {
		var htCleanData = csvJSON(data);
		var quorumSetting = ["Elders Quorum 1"];
		var assignments = transformData(htCleanData, quorumSetting);
		r.db('htapp').table('assignments').delete().run(connection, function(err, result) {
			if (err) throw err;
			r.db('htapp').table('assignments').insert(assignments).run(connection, function(err, result) {
				if (err) throw err;
			})			
		})
		response.send(assignments);
	})
})

app.get("*", function(request, response) {
	console.log("* stuff");
	response.sendfile("public/index.html");
})


http.createServer(app).listen(1337);





//Convert CSV data to JSON object
function csvJSON(csv){

	//Split into array based on carriage returns
	var lines=csv.split("\r");
 
 	//Initialize final result array
	var result = [];
 
 	//Create separate array of headers, send to rename function, get back renamed headers
	var rawHeaders=lines[0].split(",");
	var headers = renameHeaders(rawHeaders);

	//Loop through array, skipping header row (starting with i=1)
	for(var i=1;i<lines.length;i++){
 
		var obj = {};
		
		//Start first inner loop -- this makes each line an array, split by commas - ignoring commas between single quotes.
		//This sets a variable "ignoreComma" which keeps track whether it should be currently ignoring commas or not.
		//By default ignoreComma is false, set to true when it encounters a quotation mark, back to false when it encounters another.
		var currentlineString = lines[i];
		var currentlineArray = [];
		var currentlineLocation = 0;
		var ignoreComma = false;
		var ignoreCommaMark = '"'; //Set which symbol should cause the program to ignore comma

		for(var k=0;k<currentlineString.length;k++){

			//Setting ignoreComma to true/false depending on location in string
			if (!ignoreComma && currentlineString[k] == ignoreCommaMark) {
				ignoreComma = true;
			}
			else if (ignoreComma && currentlineString[k] == ignoreCommaMark) {
				ignoreComma = false;
			}
			//Slices the string and pushes to the currentlineArray, if ignoreComma is false
			if (currentlineString[k] == "," && !ignoreComma) {
				
				//Set slice start/end points depending on if we need to remove single quotes or not
				if (currentlineString[k - ignoreCommaMark.length] == ignoreCommaMark) {
					sliceStart = currentlineLocation + ignoreCommaMark.length;
					sliceEnd = k - ignoreCommaMark.length;
				}
				else {
					sliceStart = currentlineLocation;
					sliceEnd = k;
				}

				//Slice the string and push it
				var stringToPush = currentlineString.slice(sliceStart,sliceEnd);
				currentlineArray.push(stringToPush);
				currentlineLocation = k+1;
			}

		}

		//Defines the object keys based on urrent line
		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentlineArray[j];
		}
 
 		//Pushes object to the result array
		result.push(obj);
 
	}
	
	//return result; //JavaScript object

	return result;
}

function renameHeaders(rawHeaders) {
	var headers = rawHeaders;

	//HT District
	var index = headers.indexOf("HT District");
	if (~index) {headers[index] = "htDistrict";}	

	//Comp ID
	var index = headers.indexOf("Comp ID");
	if (~index) {headers[index] = "compID";}

	//Home Teacher 1
	var index = headers.indexOf("Home Teacher 1");
	if (~index) {headers[index] = "ht1";}

	//Home Teacher 1 Email
	var index = headers.indexOf("HT 1 E-mail");
	if (~index) {headers[index] = "ht1Email";}

	//Home Teacher 1 Phone
	var index = headers.indexOf("HT 1 Phone");
	if (~index) {headers[index] = "ht1Phone";}

	//Home Teacher 2
	var index = headers.indexOf("Home Teacher 2");
	if (~index) {headers[index] = "ht2";}

	//Home Teacher 2 Email
	var index = headers.indexOf("HT 2 E-mail");
	if (~index) {headers[index] = "ht2Email";}

	//Home Teacher 2 Phone
	var index = headers.indexOf("HT 2 Phone");
	if (~index) {headers[index] = "ht2Phone";}

	//Household
	var index = headers.indexOf("Household");
	if (~index) {headers[index] = "hh";}	

	//Household Phone
	var index = headers.indexOf("Household Phone");
	if (~index) {headers[index] = "hhPhone";}

	//Household Email
	var index = headers.indexOf("E-mail Address");
	if (~index) {headers[index] = "hhEmail";}

	return headers;
}


function transformData(assignments, quorumSetting) {
	var companionships = [];
	var cleanAssignments = cleanData(assignments, quorumSetting);
	var compIDs = buildUniqueValues(cleanAssignments, "compID");
	for (var i=0; i<compIDs.length; i++) {
		var currentCompID = compIDs[i];
		var formattedComp = buildSingleComp(cleanAssignments, currentCompID);
		companionships.push(formattedComp);
	}
	return companionships;
}

function cleanData(assignments, quorumSetting) {
	for (var i=0; i<assignments.length; i++) {
		//Remove household from array if they do not have an assignment, or are not in a desired quorum
		var currentCompID = assignments[i].compID;
		var currentQuorum = assignments[i].Quorum;
		if (!currentCompID || quorumSetting.indexOf(currentQuorum) < 0) {
			assignments.splice(i,1);
			i--;
		}
	}
	return assignments;
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

function buildUniqueValues(assignments, value) {
	var uniqueValues = [];
	for (var i=0; i<assignments.length; i++) {
		var currentValue = assignments[i][value];
		if (uniqueValues.indexOf(currentValue) < 0) {
			uniqueValues.push(currentValue);
		}
	}
	uniqueValues = uniqueValues.sort();
	return uniqueValues;
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
	if (singleCompArray[0].ht1) {
		var ht1 = {
			name: singleCompArray[0].ht1,
			phone: singleCompArray[0].ht1Phone,
			email: singleCompArray[0].ht1Email,
		};

		singleCompObject.ht.push(ht1);
	}	if (singleCompArray[0].ht2) {
		var ht2 = {
			name: singleCompArray[0].ht2,
			phone: singleCompArray[0].ht2Phone,
			email: singleCompArray[0].ht2Email,
		};

		singleCompObject.ht.push(ht2);
	}	if (singleCompArray[0].ht3) {
		var ht3 = {
			name: singleCompArray[0].ht3,
			phone: singleCompArray[0].ht3Phone,
			email: singleCompArray[0].ht3Email,
		};

		singleCompObject.ht.push(ht3);
	}

	//Add home teaching families
	for (var i=0; i<singleCompArray.length; i++) {
		var index = "hh" + (i + 1);
		var household = {
			name: singleCompArray[i].hh,
			phone: singleCompArray[i].hhPhone,
			email: singleCompArray[i].hhEmail,
		};
		singleCompObject.households.push(household);
	}

	return singleCompObject;
}