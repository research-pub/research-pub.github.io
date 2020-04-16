var width = 700;
var height = 300;
var tooltip = d3.select('body').append('div')
        .attr('class', 'hidden tooltip');

var svg = d3.select("body").append('div').append("svg")
    .call(d3.zoom().on("zoom", function () {
              svg.attr("transform", d3.event.transform)
      }))
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class", "states");

var projection = d3.geoMercator()
    .rotate([-132, 0])
    .center([0, -27])
    .scale(Math.min(height * 1.55, width))
    .translate([width / 2, height / 2])
    .precision(0.1);

var color = d3.scaleOrdinal()
        .range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']);

var path = d3.geoPath().projection(projection);

const url_geo = 'https://gist.githubusercontent.com/GerardoFurtado/02aa65e5522104cb692e/raw/' +
    '8108fbd4103a827e67444381ff594f7df8450411/aust.json'
d3.queue()
    .defer(d3.json, url_geo)
    .defer(d3.json, age_source)
    .defer(d3.json, gender_source)
    .await(
        function(error, australia, ageData, genderData) {
            if (error) throw error;
            aus_data = australia
            age_data = ageData
            gender_data = genderData

            if (selected_dataset = "snt_age")
                barData = ageData
            else
                barData = genderData

            svg.selectAll("path")
               .data(australia.features)
               .enter().append("path")
               .attr("d", path)
               .attr("stroke", "dimgray")
               .attr("fill", function (d, i) {
                        return color(i);
                })
                .on('click',function(d) {
                        var fs_bar = barData.features;
                        for (var i = 0; i < fs_bar.length; i++) {
                            var obj = fs_bar[i]
                            if (obj.state_code == d.properties.STATE_CODE){
                                var bar_data = obj.date_values;
                                break
                            }
                        }
                        draw_bar(bar_data)
                        d3.select('#state_title').html("")
                        for(let i =0; i < dropdown_options.length; i++){
                            let obj = dropdown_options[i]
                            if (obj.value == selected_dataset){
                                    var text = obj.text;
                                    break
                                }
                        }
                        d3.select('#state_title').html(text+ " in "+d.properties.STATE_NAME)
                    })
                .on('mousemove', function(d) {
                        var mouse = d3.mouse(svg.node()).map(function(d) {
                            return parseInt(d);
                        });
                        tooltip.classed('hidden', false)
                            .attr('style', 'left:' + (mouse[0] + 15) +
                                    'px; top:' + (mouse[1] - 35) + 'px')
                            .html(d.properties.STATE_NAME);
                    })
                .on('mouseout', function() {
                    tooltip.classed('hidden', true)
                    tooltip.html("")
                });
            var fs_bar = barData.features;
            for (var i = 0; i < fs_bar.length; i++) {
                var obj = fs_bar[i]
                if (obj.state_code == 0){
                    var bar_data = obj.date_values;
                    break
                }
            }
            // draw_pie(bar_data)
            draw_bar(bar_data)
            d3.select('#state_title').html("")
            for(let i =0; i < dropdown_options.length; i++){
                        let obj = dropdown_options[i]
                        if (obj.value == selected_dataset){
                                var text = obj.text;
                                break
                            }
                    }
            d3.select('#state_title').html(text+ " in Whole Australia")
    });

function updateMap(selected_dataset) {

        console.log(selected_dataset)
        if (selected_dataset == "snt_age")
            barData = age_data
        else
            barData = gender_data

        svg.selectAll("path")
           .data(aus_data.features)
           .enter().append("path")
           .attr("d", path)
           .attr("stroke", "dimgray")
           .attr("fill", function (d, i) {
                    return color(i);
            })
            .on('click',function(d) {
                    var fs_bar = barData.features;
                    for (var i = 0; i < fs_bar.length; i++) {
                        var obj = fs_bar[i]
                        if (obj.state_code == d.properties.STATE_CODE){
                            var bar_data = obj.date_values;
                            break
                        }
                    }
                    draw_bar(bar_data)
                    d3.select('#state_title').html("")

                    for(let i =0; i < dropdown_options.length; i++){
                        let obj = dropdown_options[i]
                        if (obj.value == selected_dataset){
                                var text = obj.text;
                                break
                            }
                    }
                    d3.select('#state_title').html(text+ " in "+d.properties.STATE_NAME)
                })
            .on('mousemove', function(d) {
                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
                    tooltip.classed('hidden', false)
                        .attr('style', 'left:' + (mouse[0] + 15) +
                                'px; top:' + (mouse[1] - 35) + 'px')
                        .html(d.properties.STATE_NAME);
                })
            .on('mouseout', function() {
                tooltip.classed('hidden', true)
                tooltip.html("")
            });
        var fs_bar = barData.features;
        for (var i = 0; i < fs_bar.length; i++) {
            var obj = fs_bar[i]
            if (obj.state_code == 0){
                var bar_data = obj.date_values;
                break
            }
        }
        // draw_pie(bar_data)
        draw_bar(bar_data)
        d3.select('#state_title').html("")
        for(let i =0; i < dropdown_options.length; i++){
                    let obj = dropdown_options[i]
                    if (obj.value == selected_dataset){
                            var text = obj.text;
                            break
                        }
                }
        d3.select('#state_title').html(text+" in Whole Australia")
}