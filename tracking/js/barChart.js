/*eslint no-undef: 0*/

let empty_gender = [
          {
            "name": "Male" ,
            "values": {
              "Positive": "0" ,
              "Negative": "0" ,
              "Neutral": "0"
            }
          } ,
          {
            "name": "Female" ,
            "values": {
              "Positive": "0" ,
              "Negative": "0" ,
              "Neutral": "0"
            }
          } ,
          {
            "name": "Unknown" ,
            "values": {
              "Positive": "0" ,
              "Negative": "0" ,
              "Neutral": "0"
            }
          }
        ];
let empty_age = [
          {
            "name": "Young",
            "values": {
              "Positive": "0",
              "Negative": "0",
              "Neutral": "0"
            }
          },
          {
            "name": "Middle",
            "values": {
              "Positive": "0",
              "Negative": "0",
              "Neutral": "0"
            }
          },
          {
            "name": "Aging",
            "values": {
              "Positive": "0",
              "Negative": "0",
              "Neutral": "0"
            }
          },
          {
            "name": "Unknown",
            "values": {
              "Positive": "0",
              "Negative": "0",
              "Neutral": "0"
            }
          }
        ]

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
  // console.log(data)
  // console.log(Object.keys(data))
  // console.log(Object.keys(data[Object.keys(data)[0]][0].values))
  // console.log(Object.values(data[Object.keys(data)[0]][0].values))

  // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = data[Object.keys(data)[0]].map(obj =>obj.name)
    // console.log(nameKeys)
  let valueKeys = Object.keys(data[Object.keys(data)[0]][0].values)
    // console.log(valueKeys)


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
      // console.log(data)
      var tooltip = d3.select('body').append('div')
        .attr('class', 'hidden tooltip');
      //find max value of a section
      // const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []))
      let values_int = []
      let values_list = data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), [])
      values_list.forEach(d => values_int.push(parseInt(d)))
      let maxValue = d3.max(values_int)

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
            tooltip.transition()
                   .duration(10)
                   .style("opacity", 1);
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                        'px; top:' + (mouse[1] - 35) + 'px')
                .html(d.value);
        })
      .on("mouseout", function(d, i) {
          d3.select(this).attr("fill", function (d) {return z(d.key)});
          tooltip.classed('hidden', true)
          tooltip.html("")
          d3.select(this).transition()
                   .duration(10)
                   .attr('opacity', '1');
          tooltip.transition()
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

d3.json(data_source, function(error, data_json){

  var data = data_json.features[0].date_values

  //start with the first year selected
  const chart = createChart(document.querySelector('svg'), data)
  console.log(data)
    // To obtain the first and last date from collected data, the day difference is the span,
    // the new date is the first date
  // const tParser = d3.timeParse("%Y-%m-%d")
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
  //   console.log(first_date)
  //   console.log(last_date)
  //   // console.log(span)
  //   // first_date
  // var dataTime = d3.range(0, span+2).map(function(d) {
  //   return new Date(first_date.getFullYear() , first_date.getMonth(), first_date.getDate() + d);
  // });
  // // console.log(dataTime)
  // let sliderTime = d3
  //   .sliderBottom()
  //   .min(d3.min(dataTime))
  //   .max(d3.max(dataTime))
  //   .step(1000 * 60 * 60 * 24)
  //   .width(700)
  //   .tickFormat(d3.timeFormat('%d/%m'))
  //   .tickValues(dataTime)
  //   .default(new Date(first_date.getFullYear() , first_date.getMonth(), first_date.getDate()))
  //   .on('onchange', val => {
  //       // console.log(data_source)
  //       // console.log(d3.timeFormat('%Y-%m-%d')(val))
  //       const selected_data = data[d3.timeFormat('%Y-%m-%d')(val)]
  //        if (typeof selected_data == 'undefined'){
  //            if (data_source.includes('age')){
  //                chart.updateChart(empty_age)
  //            }
  //            else {
  //                 chart.updateChart(empty_gender)
  //            }
  //         }
  //        else {
  //            chart.updateChart(data[d3.timeFormat('%Y-%m-%d')(val)])
  //        }
  //   });
  //
  // d3.select('div#slider-time').html("")
  // let gTime = d3
  //   .select('div#slider-time')
  //   .append('svg')
  //   .attr('width',750)
  //   .attr('height', 100)
  //   .append('g')
  //   .attr('transform', 'translate(30,30)');
  // gTime.call(sliderTime);
  //
  // append the input controls
  const fieldset1 = d3.select('.controls').append('fieldset')
  fieldset1.append('legend').text('Date')

  Object.keys(data).sort().forEach((year, index )=>{

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
    .text(function () {
        const d = year.split('-')
        return d[2]+'/'+d[1]
    })
    label.on('click', function(){
      chart.updateChart(data[year])
    })
  })

   // aggregate data fromm all dates
    const all_dates = Object.values(data)
    console.log(all_dates[0])
    let new_data = all_dates[0]
    for (let k=1; k<all_dates.length; k++){
        let date2_data = all_dates[k]
        for (let i=0; i<new_data.length; i++){
            let keys =  Object.keys(new_data[i].values)
            keys.forEach(key => {
              let val = parseInt(new_data[i].values[key]) + parseInt(date2_data[i].values[key])
              new_data[i].values[key] = val
             })
         }
    }

// Australia Plus All states Dta-------------------------------------------------------------------------
    let all_ls = []
    data_json.features.forEach(feature => {
        let data  = feature.date_values
        // data_json.features[0].date_values
        const all_dates = Object.values(data)
            //get all dates
            const dates = Object.keys(data)
            //get groups of sentiments
            const nameKeys = Object.keys(data[dates[0]][0].values)
        console.log(nameKeys)

          let  new_data = [];
        // parse the date / time
           var parseTime = d3.timeParse("%Y-%m-%d");
        // dates.sort(function(a, b) { return a - b; })
          dates.forEach(date =>{
              const current_data = data[date]
              // get (positive, negative,neurtral) number of each category (e.g., Male, Female or Other)
              let temp = Array.from(current_data.map(obj =>Object.values(obj.values)))
              //transpose
              temp = temp.map((col, i) => temp.map(row => row[i]));
              // get all number of each group of sentiments
              let values = temp.map(obj => obj.reduce((a, b) => parseInt(a) + parseInt(b), 0)).slice(0, nameKeys.length)

              if (parseTime(date) > parseTime('2020-04-13')){
                  let entry = {}
                  entry['date_str'] = date
                  entry['date'] = parseTime(date)
                  for (let i = 0; i < nameKeys.length; i++) {
                      entry[nameKeys[i]] = values[i]
                      // entry["perc_"+nameKeys[i]] = (values[i]/total).toFixed(4)
                  }
                  new_data.push(entry)
              }
          })
         // console.log(new_data)
          new_data.sort(function(a, b) { return a.date - b.date; })
        all_ls.push(new_data)
        console.log(new_data)
    });

    let array_ls = all_ls[0].map(obj => Object.values(obj).slice(2))
    let array_dates = all_ls[0].map(obj => Object.values(obj)[0])
    for(let i = 1; i < all_ls.length; i++){
        let current_ls = all_ls[i].map(obj => Object.values(obj).slice(2))
        for(let j=0; j<array_ls.length; j++){
            var sum = array_ls[j].map(function (num, idx) {
                  return num + current_ls[j][idx];
                });
            array_ls[j] = sum
        }
    }
    console.log(array_ls)
    console.log(array_dates)

//
//  let ds_list = []
//   for (let i = 0; i < array_dates.length; i++) {
//       let dict = {}
//       const current_value = array_ls[i],
//             current_total = current_value.reduce((a, b) => a + b, 0)
//       if (ds_list.length > 0) {
//           const last_value = ds_list[ i - 1]
//           // dict["date"] = current_value.date
//           dict["date_str"] = array_dates[i]
//           dict["positive"] = current_value[0]
//           dict["negative"] = current_value[1]
//           dict["neutral"] = current_value[2]
//           dict["perc_positive"] = (current_value[0]/current_total).toFixed(4);
//           dict["perc_negative"] = (current_value[1]/current_total).toFixed(4);
//           dict["perc_neutral"] =  (current_value[2]/current_total).toFixed(4);
//           dict["acc_positive"] = current_value[0] + last_value.acc_positive
//           dict["acc_negative"] = current_value[1] + last_value.acc_negative
//           dict["acc_neutral"] = current_value[2] + last_value.acc_neutral
//           ds_list.push(dict)
//       } else {
//           dict["date_str"] = array_dates[i]
//           dict["positive"] = current_value[0]
//           dict["negative"] = current_value[1]
//           dict["neutral"] = current_value[2]
//           dict["perc_positive"] = (current_value[0]/current_total).toFixed(4);
//           dict["perc_negative"] = (current_value[1]/current_total).toFixed(4);
//           dict["perc_neutral"] =  (current_value[2]/current_total).toFixed(4);
//           dict["acc_positive"] = current_value[0]
//           dict["acc_negative"] = current_value[1]
//           dict["acc_neutral"] = current_value[2]
//           ds_list.push(dict)
//       }
//   }
//   console.log(ds_list)
//
//   let csvContent = "data:text/csv;charset=utf-8,"
//   let keys = Object.keys(ds_list[0])
//     csvContent += keys.join() + "\r\n";
//   ds_list.forEach(function(rowArray) {
//       let vals = Object.values(rowArray)
//     let row = vals.join();
//     csvContent += row + "\r\n";
// });
// var encodedUri = encodeURI(csvContent);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "my_data_aus.csv");
// document.body.appendChild(link); // Required for FF
// link.click(); // This will download the data file named "my_data_aus.csv".
// Australia Plus All states Dta----------------------------------------------------------------end---------

    // only Australia Dta-------------------------------------------------------------------------
//     const all_dates = Object.values(data)
//     //get all dates
//     const dates = Object.keys(data)
//     //get groups of sentiments
//     const nameKeys = Object.keys(data[dates[0]][0].values)
//
//   let  new_data = [];
// // parse the date / time
//    var parseTime = d3.timeParse("%Y-%m-%d");
// // dates.sort(function(a, b) { return a - b; })
//   dates.forEach(date =>{
//       const current_data = data[date]
//       // get (positive, negative,neurtral) number of each category (e.g., Male, Female or Other)
//       let temp = Array.from(current_data.map(obj =>Object.values(obj.values)))
//       //transpose
//       temp = temp.map((col, i) => temp.map(row => row[i]));
//       // get all number of each group of sentiments
//       let values = temp.map(obj => obj.reduce((a, b) => parseInt(a) + parseInt(b), 0)).slice(0, nameKeys.length)
//       // get total number of a state in a day
//       let total = values.reduce((a, b) => parseInt(a) + parseInt(b), 0)
//       // console.log(parseTime(date) > parseTime('2020-04-13'))
//       if (parseTime(date) > parseTime('2020-04-13')){
//           let entry = {}
//           entry['date_str'] = date
//           entry['date'] = parseTime(date)
//           for (let i = 0; i < nameKeys.length; i++) {
//               entry[nameKeys[i]] = values[i]
//               entry["perc_"+nameKeys[i]] = (values[i]/total).toFixed(4)
//           }
//           new_data.push(entry)
//       }
//   })
//  console.log(new_data)
//     new_data.sort(function(a, b) { return a.date - b.date; })
//   console.log(new_data)
//
//  let ds_list = []
//   for (let i = 0; i < new_data.length; i++) {
//       let dict = {}
//       const current_value = new_data[i]
//       if (ds_list.length > 0) {
//           const last_value = ds_list[ i - 1]
//           // dict["date"] = current_value.date
//           dict["date_str"] = current_value.date_str
//           dict["positive"] = current_value.Positive
//           dict["negative"] = current_value.Negative
//           dict["neutral"] = current_value.Neutral
//           dict["perc_positive"] = current_value.perc_Positive;
//           dict["perc_negative"] = current_value.perc_Negative;
//           dict["perc_neutral"] = current_value.perc_Neutral;
//           dict["acc_positive"] = current_value.Positive + last_value.acc_positive
//           dict["acc_negative"] = current_value.Negative + last_value.acc_negative
//           dict["acc_neutral"] = current_value.Neutral + last_value.acc_neutral
//           ds_list.push(dict)
//       } else {
//           // dict["date"] = current_value.date
//           dict["date_str"] = current_value.date_str
//          dict["positive"] = current_value.Positive
//           dict["negative"] = current_value.Negative
//           dict["neutral"] = current_value.Neutral
//           dict["perc_positive"] = current_value.perc_Positive;
//           dict["perc_negative"] = current_value.perc_Negative;
//           dict["perc_neutral"] = current_value.perc_Neutral;
//           dict["acc_positive"] = current_value.Positive
//           dict["acc_negative"] = current_value.Negative
//           dict["acc_neutral"] = current_value.Neutral
//           ds_list.push(dict)
//       }
//   }
//
//   console.log(ds_list)
//
//   let csvContent = "data:text/csv;charset=utf-8,"
//   let keys = Object.keys(ds_list[0])
//     csvContent += keys.join() + "\r\n";
//   ds_list.forEach(function(rowArray) {
//       let vals = Object.values(rowArray)
//     let row = vals.join();
//     csvContent += row + "\r\n";
// });
// var encodedUri = encodeURI(csvContent);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "my_data.csv");
// document.body.appendChild(link); // Required for FF
//
// link.click(); // This will download the data file named "my_data.csv".
// only Australia Dta-------------------------------------------------------------------------end-----------

    // // test for bar racing chart
    // const all_keys = Object.keys(data).sort()
    // //get positive, negative and neutral
    // const all_sents = Object.keys(Object.values(data)[0][0].values)
    // let ds_list = []
    // for (let k=0; k<all_keys.length; k++){
    //     let entry = data[all_keys[k]]
    //     let temp = entry.map(key => Object.values(key.values))
    //     //transpose
    //     temp = temp.map((col, i) => temp.map(row => row[i])).slice(0, all_sents.length);
    //     let values = temp.map(obj => obj.reduce((a, b) => parseInt(a) + parseInt(b), 0))
    //     let value = {}
    //     for (let i=0; i<all_sents.length; i++){
    //         let dict = {}
    //         if (ds_list.length > 0){
    //             const last_value = ds_list[ds_list.length -1]
    //             dict["name"] =  all_sents[i]
    //             dict["value"] =  values[i] + last_value.value
    //             dict["year"] =  "2020."+ k
    //             dict["lastValue"] =  last_value.value
    //             dict["rank"] =  0
    //             ds_list.push(dict)
    //         }
    //         else{
    //             dict["name"] =  all_sents[i]
    //             dict["value"] =  values[i]
    //             dict["year"] =  "2020."+ k
    //             dict["lastValue"] =  values[i]
    //             dict["rank"] =  0
    //             ds_list.push(dict)
    //         }
    //      }
    // }
    // console.log(ds_list)
    // {
    //           "name": "Neutral",
    //           "value": 142,
    //           "year": 2020.9,
    //           "lastValue": 140,
    //           "rank": 3
    //         },

    // const entry = data[all_keys[0]]
    // // let temp = entry.map(key => Object.values(key.values)).reduce((a, b) => a+b, 0)
    // let temp = entry.map(key => Object.values(key.values))
    // // let temp = entry.map(key => Object.values(key.values).reduce((a, b) => parseInt(a)+parseInt(b),0))
    // //transpose
    //  temp = temp.map((col, i) => temp.map(row => row[i])).slice(0, all_sents.length);
    // let values = temp.map(obj => obj.reduce((a, b) => parseInt(a) + parseInt(b), 0))
    // console.log(entry)
    //   console.log(all_keys)
    // console.log(temp)


  // render initial chart
  // chart.updateChart(all_dates[0])
    chart.updateChart(new_data)

})