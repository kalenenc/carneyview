//handlebars.js template
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);


$.ajax({
	//make request to subscription/members API
	type: 'GET',
	url: 'http://localhost:3000/members' ,
	success: function(object) {

		var average = findAverage(object); 
		$('.averagePrice').append("$" + average);
		bubbleSort(object);

		//use handlebars.js to create divs for each user
		var context = object;
		var html    = template(context);
		$('.existingDiv').append(html);


	}
});

//sort the members in order based on price
function bubbleSort(a) {
	var swapped;
	    do {
	        swapped = false;
	        for (var i=0; i < a.length-1; i++) {
	            if (a[i]["subscription"]["price"] < a[i+1]["subscription"]["price"]) {
	                var temp = a[i];
	                a[i] = a[i+1];
	                a[i+1] = temp;
	                swapped = true;
	            }
	        }
	    } while (swapped);
}

//find the average price of the member
function findAverage(a) {
	var sum = 0;
	for(var i = 0; i < a.length; i++) {
		sum += parseInt(a[i]["subscription"]["price"], 10);
	}
	return sum / a.length;
}

