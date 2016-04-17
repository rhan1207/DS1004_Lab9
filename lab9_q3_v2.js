var draw_all = function() {
//var margin = {top: 20, right: 20, bottom: 30, left: 40},
//    width = 960 - margin.left - margin.right,
//    height = 500 - margin.top - margin.bottom;
/* 
// setup x 
var xValue = function(d) { return d.mpg;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.displacement;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.Manufacturer;},
    color = d3.scale.category10();
*/
// add the graph canvas to the body of the webpage
var svg = d3.select(".plot svg")
    .attr("width", 500) 		//width + margin.left + margin.right)
    .attr("height", 300); 	//height + margin.top + margin.bottom)
  //.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
/*
// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
*/

// load data
/*
d3.csv("car.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.mpg = +d.mpg;
    d.displacement = +d.displacement;
//    console.log(d);
  });
  

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("mpg");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("displacement");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")

   //   .attr("r", 3.5)
   //   .attr("cx", xMap)
   //   .attr("cy", yMap)
   //   .style("fill", function(d) { return color(cValue(d));}) 
   //   .on("mouseover", function(d) {
    //      tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
*/
  // draw legend
  //var legend = svg.selectAll(".legend")
  //    .data(color.domain())
  //  .enter().append("g")
  //    .attr("class", "legend")
  //    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  //legend.append("rect")
  //    .attr("x", width - 18)
  //    .attr("width", 18)
  //    .attr("height", 18)
  //    .style("fill", color);

  // draw legend text
  //legend.append("text")
  //    .attr("x", width - 24)
  //    .attr("y", 9)
  //    .attr("dy", ".35em")
  //    .style("text-anchor", "end")
  //    .text(function(d) { return d;})
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
		//x_select = eval("mpg")
		//y_select = eval("displacement");			
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
		
		var xscale = d3.scale.linear().domain([x_min, x_max]).range([x_min, x_max])
		var yscale = d3.scale.linear().domain([y_min, y_max]).range([y_min, y_max])
		
		var xAxis = d3.svg.axis().scale(xscale).orient('bottom');
		var yAxis = d3.svg.axis().scale(yscale).orient('left');
		
		svg.append('g')
			.attr('class','axis')
			.attr('transform', 'translate(0,' +(y_max)+ ')' )
			.call(xAxis);
		/*	
		svg.append('g')
			.attr('class','axis')
			.attr('transform', 'translate(' +(x_min)+ ', 0)' )
			.call(yAxis);
		*/	
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
