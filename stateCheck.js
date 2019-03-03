function initiatestates(){
var visSets = [
			"tree" ,
			"treemap",
			"sunburst" 
	];
var changeSets = [
		"move" ,
		"add",
		"remove" 
	];
var dataSets = [
		"small" ,
		"medium",
		"large" 
	];		
var visState=0;
var changeState=0;
var dataState=0;
}
function getStates(visState,changestate,datastate){
var states=[];
states.push(visState)
states.push(changestate)
states.push(datastate)
return states;

}

