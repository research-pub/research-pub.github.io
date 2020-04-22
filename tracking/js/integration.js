function draw_pie(data) {
    // console.log(data)
    var width = 240;
    var height = 220;
    var radius_set = 180;
    var radius = radius_set / 2;
    var donutWidth = 30; //This is the size of the hole in the middle

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
  let nameKeys = data.map(obj =>obj.name)
  // get total number of each category (Male, Female or Other)
  let values = data.map(obj =>Object.values(obj.values).reduce((a, b) => parseInt(a) + parseInt(b), 0))
    console.log(values)
  // get total number of a state in a day
  let total = values.reduce((a, b) => a + b, 0)
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


function createChart (svg, data) {

  // const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']
  const colors = ['#98abc5', '#6b486b', '#ff8c00']
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 450 - margin.left - margin.right
  const height = 210 - margin.top - margin.bottom
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

  // updates both the year + the chart type (group or stacked)
  function updateChart (data) {
      var tooltip_bar = d3.select('body').append('div')
        .attr('class', 'hidden tooltip-bar');

      console.log(data)

      //find max value of a section
      let values_int = []
      let values_list = data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), [])
      values_list.forEach(d => values_int.push(parseInt(d)))
      const maxValue = d3.max(values_int)
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
      .on('mouseover', function(d, i) {
            d3.select(this).attr("fill", "red");
            tooltip_bar.transition()
                   .duration(10)
                   .style("opacity", 1);
            var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
            tooltip_bar.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 250) +
                        'px; top:' + (mouse[1] + 340) + 'px')
                .html(d.value)
                // .style("left", (d3.event.pageX + 1) + "px")
                // .style("top", (d3.event.pageY - 15) + "px");;
        })
      .on("mouseout", function(d, i) {
          d3.select(this).attr("fill", function (d) {return z(d.key)});
          tooltip_bar.classed('hidden', true)
          tooltip_bar.html("")
          d3.select(this).transition()
                   .duration(10)
                   .attr('opacity', '1');
          tooltip_bar.transition()
                   .duration(10)
                   .style("opacity", 0);
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

function draw_bar(data) {

  var width = 350
  var height = 150
  d3.select('#bar').html("")
  var svg = d3.select('#bar')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

  const chart = createChart(svg, data);

  // TODO to uncomment to show time slide bar
 // To obtain the first and last date from collected data, the day difference is the span,
    // the new date is the first date
  // const tParser = d3.timeParse("%d/%m/%Y")
  // let dates_ls = Object.keys(data)
  // let first_date = tParser(dates_ls[0]),
  //     last_date  = tParser(dates_ls[0]);
  // for (let i = 0; i < dates_ls.length; i++) {
  //     let current_date = tParser(dates_ls[i])
  //     if (first_date > current_date)
  //         first_date = tParser(dates_ls[i])
  //     if (last_date < current_date)
  //         last_date = current_date
  // }
  // let span = d3.timeDay.count(first_date, last_date)
  //   // console.log(first_date)
  //   // console.log(last_date)
  //   // console.log(span)
  //   // first_date
  // var dataTime = d3.range(0, span+1).map(function(d) {
  //   return new Date(first_date.getFullYear() , first_date.getMonth(), first_date.getDate() + d);
  // });
  // let sliderTime = d3
  //   .sliderBottom()
  //   .min(d3.min(dataTime))
  //   .max(d3.max(dataTime))
  //   .step(1000 * 60 * 60 * 24)
  //   .width(700)
  //   .tickFormat(d3.timeFormat('%d/%m'))
  //   .tickValues(dataTime)
  //   .default(new Date(2020, 3, 2))
  //   .on('onchange', val => {
  //     chart.updateChart(data[d3.timeFormat('%d/%m/%Y')(val)])
  //     draw_pie(data[d3.timeFormat('%d/%m/%Y')(val)])
  //   });
  //
  // d3.select('div#slider-time').html("")
  // let gTime = d3
  //   .select('div#slider-time')
  //   .append('svg')
  //   .attr('width',300)
  //   .attr('height', 100)
  //   .append('g')
  //   .attr('transform', 'translate(30,30)');
  // gTime.call(sliderTime);

  // append the input controls
  // d3.select('.controls').html("")
  // const fieldset1 = d3.select('.controls').append('fieldset')
  // fieldset1.append('legend').text('Date')
  //
  // Object.keys(data).forEach((year, index )=>{
  //
  //   const label = fieldset1.append('label')
  //
  //   label
  //   .append('input')
  //   .attr('type', 'radio')
  //   .attr('name', 'year')
  //   .attr('value', year)
  //   .attr('checked', function(){
  //     if (index === 0) return true
  //     return null
  //   })
  //
  //   label.append('span')
  //       .text(year)
  //
  //   label.on('click', function(){
  //     chart.updateChart(data[year]);
  //     draw_pie(data[year])
  //   })
  // })

    const all_dates = Object.values(data)
    new_data = [];
    // clone the first data's data
    const first_entry = all_dates[0]
    for (let i=0; i<first_entry.length; i++){
        let entry =  {name: first_entry[i].name}
        let value = {}
        Object.keys(first_entry[i].values).forEach(key => {
          value[key] = parseInt(first_entry[i].values[key])
         })
        entry['values'] = value
        new_data.push(entry)
    }
    //aggregate all dates' data
    for (let k=1; k<all_dates.length; k++){
        let date2_data = [...all_dates[k]]
        for (let i=0; i<new_data.length; i++){
            let keys =  Object.keys(new_data[i].values)
            let value = {}
            keys.forEach(key => {
              value[key] = parseInt(new_data[i].values[key]) + parseInt(date2_data[i].values[key])
              new_data[i].values[key] = value[key]
             })
        }
    }
    // console.log(all_dates[0])
    // console.log(new_data)
  //start with the first year selected
  // chart.updateChart(data[Object.keys(data)[0]])
  // draw_pie(data[Object.keys(data)[0]])
  chart.updateChart(new_data)
  draw_pie(new_data)
  delete new_data;
}
