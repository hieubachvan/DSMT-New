setAnimationSpeed = function(value){
	alert("hello");
	alert(parent.timespan);
	// range of value [1, 100]
	value = parseInt(value)
	if (value >=1 && value<=100 ) {
		var min = 5;
		var max = 50;
		alert(timespan);
		timespan = parseInt(1.0*value/100*(max-min)+min);
		alert(timespan);
	}
}