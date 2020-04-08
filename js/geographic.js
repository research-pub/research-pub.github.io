        var width = 960,height = 700;
		var projection = d3.geo.conicConformal()
			.rotate([-132, 0])
			.center([0, -27])
			.parallels([-18, -36])
			.scale(Math.min(height * 1.2, width * 0.8))
			.translate([width / 2, height / 2])
			.precision(0.1);

		var radius = d3.scale.sqrt()
			.domain([0, 1e4]) // INPUT domain-range of possible input data values
			//To avoid distortion, make sure that the minimum "domain" and "range" values are both 0
			.range([0, 60]); // OUTPUT range of possible output values

		var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

		var path = d3.geo.path()
			.projection(projection);

		var color = d3.scale.ordinal()
			.range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']);

		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);

	  var url = 'https://gist.githubusercontent.com/GerardoFurtado/02aa65e5522104cb692e/raw/8108fbd4103a827e67444381ff594f7df8450411/aust.json'
	  var data_state_file = 'data/data_state.json'
      d3.json(url, function(error, australia) {
      	d3.json(data_state_file, function(error1, data_state) {
        if (error) throw error;

        svg.append("g")
            .selectAll("path")
            .data(australia.features)
            .enter().append("path")
            .attr("d", path)
			.attr("stroke", "dimgray")
			.attr("fill", function(d, i) {return color(i)})
			.on('mousemove', function(d) {
                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
                    tooltip.classed('hidden', false)
                        .attr('style', 'left:' + (mouse[0] + 15) +
                                'px; top:' + (mouse[1] - 35) + 'px')
                        .html('<table><tr><td>'+d.properties.STATE_CODE+'</td></tr><tr><td>'+d.properties.STATE_NAME+'</td></tr></table>');
                })
			.on('mouseout', function() {
				tooltip.classed('hidden', true)
				tooltip.html("")
			});

        //show data as layered bubbles
	svg.append("g")
		.attr("class", "bubble")
		.selectAll("circle")
		.data(australia.features) //data
		.enter().append("circle")
        .on('mouseover', function(d, i){
			d3.select(this).attr('class', 'hover')
		})
		.on('mouseout', function(d, i){
			d3.select(this).attr('class', '')
		})
		.attr("transform", function(d) {
			return "translate(" + path.centroid(d) + ")"; //Computes the projected centroid
		})
		.attr("r", function(d) {
			var fs = data_state.features;
			var tweet_number = 0
			for (var i = 0; i < fs.length; i++) {
				var obj = fs[i]
				if (obj.STATE_CODE == d.properties.STATE_CODE){
					tweet_number = obj.TWEET_NUMBER
					break
				}
			}
			return radius(tweet_number); //radius var with input (domain) and output (range)
		})

      })
      });
      d3.select(self.frameElement).style("height", height + "px");