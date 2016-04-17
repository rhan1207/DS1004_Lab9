var vrbs = [
	{
		id: 'mpg',
		name: 'mpg' 
	},
	{
		id: 'cylinders',
		name: 'cylinders'
	},
	{
		id: 'displacement',
		name: 'displacement'
	},
	{
		id: 'horsepower',
		name: 'horsepower'
	},
	{
		id: 'weight',
		name: 'weight'
	},
	{
		id: 'acceleration',
		name: 'acceleration'
	},
]
var draw_all = function(x_select, y_select, mpg_min, mpg_max) {
	var w = 400;
	var h = 300;
	var w_margin = w - 50;
	var h_margin = h - 50;

// add the graph canvas to the body of the webpage
var svg = d3.select(".plot svg")
    .attr("width", w) 		
    .attr("height", h); 	

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
		x_values_c = [];
		y_values_c = [];
		console.log(mpg_min);
		console.log(mpg_max);
		for (var i = 0; i < rows.length; i++){
			x_values.push(rows[i][x_select]);
			y_values.push(rows[i][y_select]);
			if (rows[i].mpg >= mpg_min && rows[i].mpg <= mpg_max) 
				x_values_c.push(rows[i][x_select]);
				y_values_c.push(rows[i][y_select]);
		} 
		var x_min = d3.min(x_values);
		var x_max = d3.max(x_values);
		var y_min = d3.min(y_values);
		var y_max = d3.max(y_values);
		
		var x_scale = w_margin / x_max;
		var y_scale = h_margin / y_max;
		var xscale = d3.scale.linear().domain([x_min, x_max]).range([x_min * x_scale , x_max * x_scale])
		var yscale = d3.scale.linear().domain([y_min, y_max]).range([y_max * y_scale, y_min*y_scale])
		
		var xAxis = d3.svg.axis().scale(xscale).ticks(5).orient('bottom');
		var yAxis = d3.svg.axis().scale(yscale).ticks(5).orient('left');
		
		svg.append('g')
			.classed('axis', true)
			.attr('transform', 'translate(-15,' +(y_max*y_scale + 15)+ ')' )
			.style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
			.call(xAxis);
			
		svg.append('text')
			.attr('class', 'x label')
			.attr('text-anchor', 'end')
			.attr('x', w)
			.attr('y', h - 40)
			.text(x_select)
				
		svg.append('g')
			.classed('axis', true)
			.attr('transform', 'translate(' +(x_min*x_scale - 15)+ ', +15)' )
			.style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
			.call(yAxis);
			
		svg.append('text')
			.attr('class', 'y label')
			.attr('text-anchor', 'end')
			.attr('y', 40)
			.attr('dy', '.75em')
			.attr('transfrom', 'rotate(-90)')
			.text(y_select)
			
		var circles = svg.selectAll('circle').data(d3.zip(x_values_c,y_values_c))
		
		circles.enter().append('circle')
		
		circles
		.attr('class', 'datapoint')
		.attr('cx', function(d){
			return xscale(d[0]);
		})
		.attr('cy', function(d){
			return yscale(d[1]);
		})
		.attr('r', 3);	
		
		circles.exit().remove();
	});
};


$(document).ready(function() {
	var selectX = $('#sel-x');
	for (var i = 0; i < vrbs.length; i ++) { 
		var vrb = vrbs[i];
		$('<option></option>')
			.val(vrb.id)
			.text(vrb.name)
			.appendTo(selectX)
	}
	
	var selectY = $('#sel-y');
	for (var i = 0; i < vrbs.length; i ++) { 
		var vrb = vrbs[i];
		$('<option></option>')
			.val(vrb.id)
			.text(vrb.name)
			.appendTo(selectY)
	}
	var x_select; 
	var y_select;
	var mpg_min = $('#mpg-min').val();
	var mpg_max = $('#mpg-max').val();
	
	$('#sel-x').on('change', function() { 
		x_select = $(this).find(':selected').val();
		if (x_select != undefined && y_select != undefined)
			draw_all(x_select, y_select, mpg_min, mpg_max);	
	});
	$('#sel-y').on('change', function() { 
		y_select = $(this).find(':selected').val();
		if (x_select != undefined && y_select != undefined)
			draw_all(x_select, y_select, mpg_min, mpg_max);	
	});

	$('#update').on('click', function() {
		mpg_min = $('#mpg-min').val();
		mpg_max = $('#mpg-max').val();
		if (x_select != undefined && y_select != undefined)
			draw_all(x_select, y_select, mpg_min, mpg_max);
	});
});
