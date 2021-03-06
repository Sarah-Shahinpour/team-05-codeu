google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(){
	//This creates a Data Table
	var myTable = new google.visualization.DataTable();
	//This adds columbs to it
	myTable.addColumn('string','Book Title');
	myTable.addColumn('number','Votes');
		
	//Now we add data to the table
	myTable.addRows([
		["The Best We Could Do", 6],
		["Sing, Unburied, Sing", 10],
		["The Book of Unknown Americans", 7],
		["The 57 Bus", 4],
		["The Handmaid's Tale", 8]
		]);
	//Now we initialize it as a bar chart. NOTE:: book_chart is the div id
	var chart= new google.visualization.BarChart(document.getElementById('book_chart'));
	//Finally we draw it
	chart.draw(myTable)
	//The issue now is some of the Movies Above are not being displayed. We must then edit the chart's layout to fix this.
	var chart_options = {
		//Note, the chart_options vary with every chart you use. 
		//Since we are using the bar chart option, you can use height, width, title, and font size.
		//If you change some of these options, negative consequences in your display may occur
		width: 800,
		height: 400,
		title: "Movie Ratings",
		fontSize:14
	};
	chart.draw(myTable,chart_options)
	
}