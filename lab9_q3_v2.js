var draw_all = function() {
	var w = 400;
	var h = 300;
	var w_margin = w - 50;
	var h_margin = h - 50;

// add the graph canvas to the body of the webpage
var svg = d3.select(".plot svg")
    .attr("width", w) 		//width + margin.left + margin.right)
    .attr("height", h); 	//height + margin.top + margin.bottom)

  d3.csv('car.csv')
	.row(function(d) {
		return {
		key: d.name, 
		mpg: +d.mpg,
		cylinders: +d.cylinders,
		displacement: +d.displacement,
		horsepower: +d.horsepower,
		weight: +d.weight,
		acceleration: +d.acceleration,
		};
	})
	.get(function(error, rows){		
		x_values = [];
		y_values = [];
		for (var i = 0; i < rows.length; i++){
			y_values.push(rows[i].mpg);
			x_values.push(rows[i].displacement);
		} 
		
		var x_min = d3.min(x_values);
		var x_max = d3.max(x_values);
		var y_min = d3.min(y_values);
		var y_max = d3.max(y_values);
		
		var x_scale = w_margin / x_max;
		var y_scale = h_margin / y_max;
		var xscale = d3.scale.linear().domain([x_min, x_max]).range([x_min * x_scale , x_max * x_scale])
		var yscale = d3.scale.linear().domain([y_min, y_max]).range([y_max * y_scale, y_min*y_scale])
		
		var xAxis = d3.svg.axis().scale(xscale).orient('bottom');
		var yAxis = d3.svg.axis().scale(yscale).orient('left');
		
		svg.append('g')
			.attr('class','axis')
			.attr('transform', 'translate(0,' +(y_max*y_scale)+ ')' )
			.call(xAxis);
			
		svg.append('g')
			.attr('class','axis')
			.attr('transform', 'translate(' +(x_min*x_scale)+ ', 0)' )
			.call(yAxis);
			
		svg.selectAll('circle')
		.data(d3.zip(x_values,y_values))
		.enter().append('circle')
		.attr('class', 'datapoint')
		.attr('cx', function(d){
			return xscale(d[0]);
		})
		.attr('cy', function(d){
			return yscale(d[1]);
		})
		.attr('r', 2);	
		console.log(y_min);
		console.log(y_max);
	});
 

};
$(document).ready(function(){
	draw_all();	
});
