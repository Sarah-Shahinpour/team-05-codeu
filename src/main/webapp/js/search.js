function test(){
	//This is to see the selection value
var x=document.getElementById("selection").value;
console.log(x);

var x=document.getElementById("1").checked;
//This returns true if they checked it.


}

function goToMessages(){

var distanceChoice="near";
if(document.getElementById("notNear").checked==true){
	distanceChoice="notNear";
}
var emotion="positive";

if(document.getElementById("negative").checked==true){
	emotion="negative";
}

var choice=document.getElementById("selection").value;



var url="/feed.html?user="+distanceChoice+emotion+choice;
console.log(url);
console.log("hi");

location.replace(url);

}