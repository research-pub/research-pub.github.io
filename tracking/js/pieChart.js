//both female and male data
// var temp = {
//      Positive: 472,
//      Negative: 318,
//      Neutral: 412
//      };
//
//
// var width = 500;
// var height = 500;
// var radius_set = 360;
// var radius = radius_set / 2;
// var donutWidth = 75; //This is the size of the hole in the middle
//
// // var color = d3.scaleOrdinal().range(['#98abc5', '#6b486b', '#ff8c00']);
// var color = d3.scaleOrdinal().range(['#2e1dc5', '#6b1415', '#ff25d3']);
//
// // changing data format from key/value to list
// let titleValues = Object.values(temp)
// let valueKeys = Object.keys(temp)
// let total = titleValues.reduce((a, b) => a + b, 0)
// let new_data = []
// for (let i = 0; i < valueKeys.length; i++) {
//     let item = {}
//     item.title = valueKeys[i]
//     item.value = titleValues[i]
//     item.all = total
//     new_data.push(item)
// }
//
// var svg = d3.select('#pie')
//      .append('svg')
//      .attr('width', width)
//      .attr('height', height)
//      .append('g')
//      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
//
// var arc = d3.arc()
//      .innerRadius(radius - donutWidth)
//      .outerRadius(radius);
//
// var pie = d3.pie()
//      .value(function (d) {
//           return d.value;
//      })
//      .sort(null);
//
// var div = d3.select("body").append("div")
//      .attr("class", "tooltip-donut")
//      .style("opacity", 0);
//
// var arcOver = d3.arc()
//      .innerRadius(radius - donutWidth)
//      .outerRadius(radius+10);
//
// var path = svg.selectAll('path')
//      .data(pie(new_data))
//      .enter()
//      .append('path')
//      .attr('d', arc)
//      .attr('fill', function (d, i) {
//           return color(d.data.title);
//      })
//      .attr('transform', 'translate(0, 0)')
//      .on('mouseover', function (d, i) {
//           d3.select(this).transition()
//                .duration(50)
//                .attr('opacity', '.85')
//                .attr('d', arcOver);
//           div.transition()
//                .duration(50)
//                .style("opacity", 1);
//           let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
//           div.html(num)
//                .style("left", (d3.event.pageX + 10) + "px")
//                .style("top", (d3.event.pageY - 15) + "px");
//      })
//      .on('mouseout', function (d, i) {
//           d3.select(this).transition()
//                .duration(50)
//                .attr('opacity', '1')
//                 .attr('d', arc);;
//           div.transition()
//                .duration(50)
//                .style("opacity", 0);
//      });
//
// var legendRectSize = 13;
// var legendSpacing = 7;
// var legend = svg.selectAll('.legend') //the legend and placement
//             .data(color.domain())
//             .enter()
//             .append('g')
//             .attr('class', 'circle-legend')
//             .attr('transform', function (d, i) {
//                  var height = legendRectSize + legendSpacing;
//                  var offset = height * color.domain().length / 2;
//                  var horz = -2 * legendRectSize - 13;
//                  var vert = i * height - offset;
//                  return 'translate(' + horz + ',' + vert + ')';
//             });
//
//     legend.append('circle') //keys
//             .style('fill', color)
//             .style('stroke', color)
//             .attr('cx', 0)
//             .attr('cy', 0)
//             .attr('r', '.5rem');
//
//     legend.append('text') //labels
//             .attr('x', legendRectSize + legendSpacing)
//             .attr('y', legendRectSize - legendSpacing)
//             .text(function (d) {
//                  return d;
//             });

d3.queue()
    .defer(d3.json, age_source)
    .await(
        function(error, ageData) {
            let data = ageData.features[0].date_values;
            draw_pie(data[Object.keys(data)[0]])
        });

function change(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    path = d3.select("#pie")
        .selectAll("path")
        .data(pie); // Compute the new angles
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

d3.select("button#everyone")
     .on("click", function () {
          change(totals);
     })
d3.select("button#women")
     .on("click", function () {
          change(femaleData);
     })
d3.select("button#men")
     .on("click", function () {
          change(maleData)
     })

function draw_pie(data) {
    // console.log(data)
    // var width = 240;
    // var height = 220;
    // var radius_set = 180;
    // var radius = radius_set / 2;
    // var donutWidth = 30; //This is the size of the hole in the middle

    var width = 500;
    var height = 500;
    var radius_set = 360;
    var radius = radius_set / 2;
    var donutWidth = 75; //This is the size of the hole in the middle

        var color = d3.scaleOrdinal().range(['#2e1dc5', '#6b1415', '#ff25d3', '#c5211a', '#0ac50f']);
    d3.select('#pie').html("");
    var svg = d3.select('#pie')
         .append('svg')
         .attr('width', width)
         .attr('height', height)
         .append('g')
         .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
         .innerRadius(radius - donutWidth)
         .outerRadius(radius);

    var pie = d3.pie()
         .value(function (d) {
              return d.value;
         })
         .sort(null);
    d3.selectAll('.tooltip-donut').remove()
    var div = d3.select("body").append("div")
         .attr("class", "tooltip-donut")
         .style("opacity", 0);


   // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = Object.keys(data[0].values)
  // get (positive, negative,neurtral) number of each category (Male, Female or Other)
  let temp = Array.from(data.map(obj =>Object.values(obj.values)))
  //transpose
  temp = temp.map((col, i) => temp.map(row => row[i]));
  let values = temp.map(obj => obj.reduce((a, b) => parseInt(a) + parseInt(b), 0)).slice(0, nameKeys.length)
  // get total number of a state in a day
  let total = values.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  let new_data = []
    for (let i = 0; i < nameKeys.length; i++) {
        let item = {}
        item.title = nameKeys[i]
        item.value = values[i]
        item.all = total
        new_data.push(item)
    }

    // console.log(new_data)

    var arcOver = d3.arc()
         .innerRadius(radius - donutWidth)
         .outerRadius(radius+10);

    var path = svg.selectAll('path')
         .data(pie(new_data))
         .enter()
         .append('path')
         .attr('d', arc)
         .attr('fill', function (d, i) {
              return color(d.data.title);
         })
         .attr('transform', 'translate(0, 0)')
         .on('mouseover', function (d, i) {
              d3.select(this).transition()
                   .duration(50)
                   .attr('opacity', '.85')
                   .attr('d', arcOver);
              div.transition()
                   .duration(50)
                   .style("opacity", 1);
              let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
              div.html(num)
                   .style("left", (d3.event.pageX + 10) + "px")
                   .style("top", (d3.event.pageY - 15) + "px");
         })
         .on('mouseout', function (d, i) {
              d3.select(this).transition()
                   .duration(50)
                   .attr('opacity', '1')
                    .attr('d', arc);;
              div.transition()
                   .duration(50)
                   .style("opacity", 0);
         });

    var legendRectSize = 13;
    var legendSpacing = 7;
    var legend = svg.selectAll('.legend') //the legend and placement
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'circle-legend')
                .attr('transform', function (d, i) {
                     var height = legendRectSize + legendSpacing;
                     var offset = height * color.domain().length / 2;
                     var horz = -2 * legendRectSize - 13;
                     var vert = i * height - offset;
                     return 'translate(' + horz + ',' + vert + ')';
                });

        legend.append('circle') //keys
                .style('fill', color)
                .style('stroke', color)
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', '.5rem');

        legend.append('text') //labels
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function (d) {
                     return d;
                });
}