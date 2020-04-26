var svg_width = 960, svg_height = 500;

    // create the svg
    var svg = d3.select("#daily_sentiment").append("svg").attr("width", svg_width).attr("height", svg_height),
        margin = {top: 30, right: 20, bottom: 50, left: 40},
        width = +svg_width - margin.left - margin.right,
        height = +svg_height - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // create the svg
    var svg_per = d3.select("#daily_percentage").append("svg").attr("width", svg_width).attr("height", svg_height),
        g_per = svg_per.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    // set x scale
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    // set y scale
    var y = d3.scaleLinear().rangeRound([height, 0]);

    // set the colors
    var z = d3.scaleOrdinal()
        .range(["green",  "yellow", "red", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y).ticks(5)
    }

// load the csv and create the chart
// "data/age-groups.csv"
d3.csv("data/output_format.csv",
    function(d, i, columns) {
        // console.log(columns)
        // console.log(d)
        d.date = parseTime(d[columns[0]]);
        for (i = 1; i < columns.length; ++i){
            d[columns[i]] = +d[columns[i]];
        }
        return d;
    },
    function(error, data) {
          if (error) throw error;
          var keys = data.columns.slice(1,4);
          let tmp = keys[1]
          keys[1] = keys[2]
          keys[2] = tmp

          data.sort(function(a, b) { return a.date - b.date; });
          x.domain(data.map(function(d) {return d.date.getDate() +"/"+(d.date.getMonth()+1); }));
          y.domain([0, d3.max(data, function(d) {
              return d[data.columns[1]] + d[data.columns[2]]+d[data.columns[3]]; })]).nice();
          z.domain(keys);

          // console.log(d3.stack().keys(keys.slice().reverse())(data))
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            // .style("text-decoration", "underline")
            .text("Daily number of Twitter users referencing COVID Safe app");

        g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

        g.append("g")
              // .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, 's')
              )
              .append("text")
              .attr("x", 2)
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start");

        g.append("g")
                .attr("class","grid")
                .style("stroke-dasharray",("3,3"))
                .call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat("")
                 )

          g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys.slice().reverse())(data))
            .enter().append("g")
              .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
              .attr("x", function(d) { return x(d.data.date.getDate() +"/"+(d.data.date.getMonth()+1)) + 3; })
              .attr("y", function(d) { return y(d[1]); })
              .attr("height", function(d) { return y(d[0]) - y(d[1]); })
              .attr("width", x.bandwidth()-5)
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
              // console.log(d);
              var xPosition = d3.mouse(this)[0] - 5;
              var yPosition = d3.mouse(this)[1] - 5;
              tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
              tooltip.select("text").text(d[1]-d[0]);
            });

          var legend = g.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 15)
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice())
             // .data(keys.slice().reverse())
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(" + (i * 150 - 550) + ",450)"; });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);
          let legend_txt = ["Support users", "Neutral users", "Against users"]
          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .text(function(d,i) { return legend_txt[i]; });

          var keys = data.columns.slice(4,7);
          tmp  = keys[1]
          keys[1] = keys[2]
          keys[2] = tmp
          y.domain([0, 1]).nice();
          z.domain(keys);
          svg_per.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            // .style("text-decoration", "underline")
            .text("Daily percentage of different sentiment groups");

          g_per.append("g")
              // .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          g_per.append("g")
              .call(d3.axisLeft(y)
              .tickFormat(d3.format(".0%"))
              .ticks(5)
              )
            .append("text")
              .attr("x", 2)
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")

          g_per.append("g")
                .attr("class","grid")
                .style("stroke-dasharray",("3,3"))
                .call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat("")
                 )

          g_per.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys.slice().reverse())(data))
            .enter().append("g")
              .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
              .attr("x", function(d) { return x(d.data.date.getDate() +"/"+(d.data.date.getMonth()+1)) + 3; })
              .attr("y", function(d) { return y(d[1]); })
              .attr("height", function(d) { return y(d[0]) - y(d[1]); })
              .attr("width", x.bandwidth()-5)
            .on("mouseover", function() { tooltip_per.style("display", null); })
            .on("mouseout", function() { tooltip_per.style("display", "none"); })
            .on("mousemove", function(d) {
              var xPosition = d3.mouse(this)[0] - 5;
              var yPosition = d3.mouse(this)[1] - 5;
              tooltip_per.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
              tooltip_per.select("text").text(((d[1]-d[0])*100).toFixed(2)+"%");
            });

          var legend = g_per.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 15)
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice())
             // .data(keys.slice().reverse())
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(" + (i * 150 - 550) + ",450)"; });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend_txt = ["Support group", "Neutral group", "Against group"]
          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .text(function(d,i) { return legend_txt[i]; });
    });

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  var tooltip_per = svg_per.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  tooltip_per.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip_per.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");