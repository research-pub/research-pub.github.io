// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");
// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Get the data
d3.csv(data_source, function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      d.open = +d.open;
      d.positive = Math.floor(Math.random() * 30) + 50
      d.negative = Math.floor(Math.random() * 20) + 20
      d.neutral = Math.floor(Math.random() * 20) + 30
      d.aus_users = Math.floor(Math.random() * 10000) + 2000
      d.ref_users = Math.floor(Math.random() * 1000) + 200
  });
  data.sort(function(a, b){return a.date - b.date})
  console.log(data)

  let ds_list = []

  for (let i = 0; i < data.length; i++) {
      let dict = {}
      const current_value = data[i]
      if (ds_list.length > 0) {
          const last_value = ds_list[ i - 1]
          dict["date"] = current_value.date
          dict["positive"] = current_value.positive
          dict["negative"] = current_value.negative
          dict["neutral"] = current_value.neutral
          dict["aus_users"] = current_value.aus_users
          dict["ref_users"] = current_value.ref_users
          dict["acc_positive"] = current_value.positive + last_value.acc_positive
          dict["acc_negative"] = current_value.negative + last_value.acc_negative
          dict["acc_neutral"] = current_value.neutral + last_value.acc_neutral
          dict["acc_aus_users"] = current_value.aus_users + last_value.acc_aus_users
          dict["acc_ref_users"] = current_value.ref_users + last_value.acc_ref_users
          ds_list.push(dict)
      } else {
          dict["date"] = current_value.date
          dict["positive"] = current_value.positive
          dict["negative"] = current_value.negative
          dict["neutral"] = current_value.neutral
          dict["aus_users"] = current_value.aus_users
          dict["ref_users"] = current_value.ref_users
          dict["acc_positive"] = current_value.positive
          dict["acc_negative"] = current_value.negative
          dict["acc_neutral"] = current_value.neutral
          dict["acc_aus_users"] = current_value.aus_users
          dict["acc_ref_users"] = current_value.ref_users
          ds_list.push(dict)
      }
  }
  console.log(ds_list)

  draw_daily_user(data)
  drew_daily_sentiment(data)
  draw_acc_user(ds_list)
  drew_acc_sentiment(ds_list)

  function draw_daily_user(data) {
      // define the 1st line
    var aus_line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.aus_users); });

    // define the 2nd line
    var ref_line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.ref_users); });
      // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#daily_users").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) {return Math.max(d.aus_users, d.ref_users); })]);

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        // .style("text-decoration", "underline")
        .text("Daily User");

    // Add the positive path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .style("stroke", "green")
          .attr("d", aus_line);

      // Add the negative path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .style("stroke", "red")
          .attr("d", ref_line);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

      var legend_keys = ["Australian Users", "Referencing Users"]
        var colors = ["green", "red"]

        var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
            .enter().append("g")
            .attr("class","lineLegend")
            .attr("transform", function (d,i) {
                    return "translate(10," + (i*20)+")";
                });

        lineLegend.append("text").text(function (d) {return d;})
            .attr("transform", "translate(15,9)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", function (d, i) {return colors[i]; })
            .attr("width", 10).attr("height", 10);

      }

    function drew_daily_sentiment(data) {
        // define the 1st line
        var pos_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.positive); });

        // define the 2nd line
        var neg_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.negative); });

        // define the 2nd line
        var neu_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.neutral); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#daily_snt").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .text("Daily Sentiment");

          // Scale the range of the data
          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) {return Math.max(d.positive, d.negative, d.neutral); })]);

          // Add the positive path.
          svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", "green")
              .attr("d", pos_line);

          // Add the negative path.
          svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", "red")
              .attr("d", neg_line);

          // Add the neutral path.
          svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", "yellow")
              .attr("d", neu_line);

          // Add the X Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y));

          var legend_keys = ["Support", "Against", "Neutral"]
          var colors = ["green", "red", "yellow"]

        var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
            .enter().append("g")
            .attr("class","lineLegend")
            .attr("transform", function (d,i) {
                    return "translate(10," + (i*20)+")";
                });

        lineLegend.append("text").text(function (d) {return d;})
            .attr("transform", "translate(15,9)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", function (d, i) {return colors[i]; })
            .attr("width", 10).attr("height", 10);

    }

  function draw_acc_user(ds_list) {
      // define the 1st line
    var aus_line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.acc_aus_users); });

    // define the 2nd line
    var ref_line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.acc_ref_users); });
      // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#accumulated_users").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .text("Accumulative User");
    // Scale the range of the data
    x.domain(d3.extent(ds_list, function(d) { return d.date; }));
    y.domain([0, d3.max(ds_list, function(d) {return Math.max(d.acc_aus_users, d.acc_ref_users); })]);
    // Add the positive path.
      svg.append("path")
          .data([ds_list])
          .attr("class", "line")
          .style("stroke", "green")
          .attr("d", aus_line);

      // Add the negative path.
      svg.append("path")
          .data([ds_list])
          .attr("class", "line")
          .style("stroke", "red")
          .attr("d", ref_line);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

      var legend_keys = ["Australian Users", "Referencing Users"]
          var colors = ["green", "red"]

        var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
            .enter().append("g")
            .attr("class","lineLegend")
            .attr("transform", function (d,i) {
                    return "translate(10," + (i*20)+")";
                });

        lineLegend.append("text").text(function (d) {return d;})
            .attr("transform", "translate(15,9)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", function (d, i) {return colors[i]; })
            .attr("width", 10).attr("height", 10);
      }

    function drew_acc_sentiment(ds_list) {
        // define the 1st line
        var pos_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.acc_positive); });

        // define the 2nd line
        var neg_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.acc_negative); });

        // define the 2nd line
        var neu_line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.acc_neutral); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#accumulated_snt").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .text("Accumulative Sentiment");

          // Scale the range of the data
          x.domain(d3.extent(ds_list, function(d) { return d.date; }));
          y.domain([0, d3.max(ds_list, function(d) {return Math.max(d.acc_positive, d.acc_negative, d.acc_neutral); })]);

          // Add the positive path.
          svg.append("path")
              .data([ds_list])
              .attr("class", "line")
              .style("stroke", "green")
              .attr("d", pos_line);

          // Add the negative path.
          svg.append("path")
              .data([ds_list])
              .attr("class", "line")
              .style("stroke", "red")
              .attr("d", neg_line);

          // Add the neutral path.
          svg.append("path")
              .data([ds_list])
              .attr("class", "line")
              .style("stroke", "yellow")
              .attr("d", neu_line);

          // Add the X Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y));

          var legend_keys = ["Support", "Against", "Neutral"]
          var colors = ["green", "red", "yellow"]

        var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
            .enter().append("g")
            .attr("class","lineLegend")
            .attr("transform", function (d,i) {
                    return "translate(10," + (i*20)+")";
                });

        lineLegend.append("text").text(function (d) {return d;})
            .attr("transform", "translate(15,9)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", function (d, i) {return colors[i]; })
            .attr("width", 10).attr("height", 10);
    }
});
