/*eslint no-undef: 0*/

function createChart (svg, data) {

  const colors = ['#98abc5', '#6b486b', '#ff8c00', '#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']
  // const colors = ['#98abc5', '#6b486b', '#ff8c00']
  svg = d3.select(svg)
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 700 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)

  var x1 = d3.scaleBand()
    .padding(0.05)

  var y = d3.scaleLinear()
    .rangeRound([height, 0])

  var z = d3.scaleOrdinal().range(colors)
console.log(data)
  console.log(Object.keys(data)[0])
  console.log(Object.keys(data[Object.keys(data)[0]][0].values))
  console.log(Object.values(data[Object.keys(data)[0]][0].values))


  // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = data[Object.keys(data)[0]].map(obj =>obj.name)
  let valueKeys = Object.keys(data[Object.keys(data)[0]][0].values)


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

  function updateChart (data) {
      var tooltip = d3.select('body').append('div')
        .attr('class', 'hidden tooltip');
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
      .attr('fill', function (d) {return z(d.key)})
      .attr('y', height)
      .on('mouseover', function(d, i) {
            d3.select(this).attr("fill", "red");
            var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                        'px; top:' + (mouse[1] - 35) + 'px')
                .html(d.value);
        })
      .on("mouseout", function(d, i) {
          d3.select(this).attr("fill", function (d) {return z(d.key)});
          tooltip.classed('hidden', true)
          tooltip.html("")
        })
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

d3.json(data_source, function(error, data_json){

  var data = data_json.features[0].date_values

  //start with the first year selected
  const chart = createChart(document.querySelector('svg'), data)

  // append the input controls
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
      chart.updateChart(data[year])
    })
  })
  // render initial chart
  chart.updateChart(data[Object.keys(data)[0]])

})