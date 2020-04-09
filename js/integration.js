
function draw_pie(data) {
    console.log(data)
    var width = 240;
    var height = 220;
    var radius_set = 180;
    var radius = radius_set / 2;
    var donutWidth = 30; //This is the size of the hole in the middle

    var color = d3.scaleOrdinal().range(['#98abc5', '#6b486b', '#ff8c00']);
    d3.select('#pie').html("");
    var svg = d3.select('#pie')
         .append('svg')
         .attr('width', width)
         .attr('height', height)
         .append('g')
         .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

     // var svg = d3.select('svg')
     //     .append('g')
     //     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');


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
    // div.html("")

    var arcOver = d3.arc()
         .innerRadius(radius - donutWidth)
         .outerRadius(radius+10);

    var path = svg.selectAll('path')
         .data(pie(data))
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


function createChart (svg, data) {

  // const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']
  const colors = ['#98abc5', '#6b486b', '#ff8c00']
  // svg = d3.select(svg)
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 350 - margin.left - margin.right
  const height = 150 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)

  var x1 = d3.scaleBand()
    .padding(0.05)

  var y = d3.scaleLinear()
    .rangeRound([height, 0])

  var z = d3.scaleOrdinal()
    .range(colors)

  // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = data[Object.keys(data)[0]].map(obj =>obj.name)
  let valueKeys =   ["Positive", "Negative", "Neural"]

  x0.domain(nameKeys)
  x1.domain(valueKeys).rangeRound([0, x0.bandwidth()])

  const barContainer = g.append('g')

  const xAxis = g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0))

  const yAxis = g.append('g')
      .attr('class', 'axis')

  yAxis
    .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Prop Value')

  var legend = g.append('g')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text('Sentiment')
  .attr('x', width - 19)
  .style('font-weight', 'bold')
      .style('font-size', 'medium')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g')
    .data(valueKeys)
    .enter().append('g')
      .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' })

  legendEnter.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

  legendEnter.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .style('font-size', 'medium')
      .text(d => d)

  const stack = d3.stack()
      .keys(valueKeys)

  // updates both the year + the chart type (group or stacked)
  function updateChart (data, chartType='group') {

      //find max value of a section
      const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []))
      y.domain([0, maxValue]).nice()

      yAxis.transition().call(d3.axisLeft(y))

      const barsWithData = barContainer
      .selectAll('g')
      .data(data)

      barsWithData.exit().remove()

      const bars = barsWithData
      .enter()
      .append('g')
      .attr('transform', function (d) { return 'translate(' + x0(d.name) + ',0)' })
      .merge(barsWithData)
      .selectAll('rect')
      .data(function (d) {
        return Object.keys(d.values).map(k => ({ key: k, value: d.values[k] }))
      })

      bars.exit().transition().style('opacity', 0).remove()

      bars
      .enter()
      .append('rect')
      .attr('fill', function (d) {
        return z(d.key)
      })
      // start y at height (0) so animation in looks like bars are growing upwards
      .attr('y', height)
      .merge(bars)
      .transition()
      .attr('width', x1.bandwidth())
      .attr('x', function (d) { return x1(d.key) })
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value))

  }

  return {
    updateChart
  }
}

function draw_bar(data) {
    //start with the first year selected
  // const chart = createChart(document.querySelector('svg'), data)
  var width = 300
  var height = 100
  d3.select('#bar').html("")
  var svg = d3.select('#bar')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

  const chart = createChart(svg, data);

  // append the input controls
  d3.select('.controls').html("")
  const fieldset1 = d3.select('.controls').append('fieldset')
  fieldset1.append('legend').text('Date')

  Object.keys(data).forEach((year, index )=>{

    const label = fieldset1.append('label')

    label
    .append('input')
    .attr('type', 'radio')
    .attr('name', 'year')
    .attr('value', year)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })

    label.append('span')
    .text(year)

    label.on('click', function(){
      chart.updateChart(data[year], document.querySelector('input[name="graphType"]:checked').value)
    })
  })

  const fieldset2 = d3.select('.controls').append('fieldset')
  const types =  ['group', 'stack']
  // fieldset2.append('legend').text('Graph Layout')

  types.forEach((graphType, index)=>{
    const label = fieldset2.append('label')
    label.append('input')
    .attr('type', 'radio')
    .attr('hidden', 'True')
    .attr('name', 'graphType')
    .attr('value', graphType)
    .attr('checked', function(){
      if (index === 0) return true
      return null
    })
    .on('click', ()=>{
      chart.updateChart(data[document.querySelector('input[name="year"]:checked').value], graphType)
    })

    // label.append('span')
    // .text(graphType)

  })
  // render initial chart
  chart.updateChart(data[Object.keys(data)[0]])
}
