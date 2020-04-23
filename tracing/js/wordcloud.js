function WordCloud(options) {
  var margin =
          // {top: 10, right: 10, bottom: 0, left: 10},
      {top: 10, right:500, bottom: 20, left: -10},
      w = 1000, h = 800,
      w_g = 1000, h_g = 800;
  // create the svg
  var svg = d3.select(options.container).append("svg")
              .attr('height', h)
              .attr('width', w)

  // var margin = {top: 70, right: 100, bottom: 0, left: 100},
  //          w = 1200 - margin.left - margin.right,
  //          h = 400 - margin.top - margin.bottom;

  // create the svg
  // var svg = d3.select(options.container).append("svg")
  //             .attr('height', h + margin.top + margin.bottom)
  //             .attr('width', w + margin.left + margin.right)

  // set the ranges for the scales
  var xScale = d3.scaleLinear().range([10, 100]);

  var focus = svg.append('g')
                 .attr("transform", "translate(" + [w_g/2+margin.left, h_g/2+margin.top] + ")")
    // .attr("transform", "translate(" + [w/2, h/2+margin.top] + ")")

  let color = d3.scaleOrdinal(d3.schemeCategory10);

  // seeded random number generator
  var arng = new alea('hello.');

  var data;
  d3.json(options.data, function(error, d) {
    if (error) throw error;
    data = d;
    var word_entries = d3.entries(data['count']);
    xScale.domain(d3.extent(word_entries, function(d) {return d.value;}));

    // console.log(word_entries)
    makeCloud();

    function makeCloud() {
      d3.layout.cloud().size([w_g, h_g])
               .timeInterval(20)
               .words(word_entries)
               .fontSize(function(d) { return xScale(+d.value); })
               .text(function(d) { return d.key; })
               .font("Impact")
               .random(arng)
               .on("end", function(output) {
                 // sometimes the word cloud can't fit all the words- then redraw
                 // https://github.com/jasondavies/d3-cloud/issues/36
                 if (word_entries.length !== output.length) {
                   console.log("not all words included- recreating");
                   makeCloud();
                   return undefined;
                 } else { draw(output); }
               })
               .start();
    }
    d3.layout.cloud().stop();
  });

  function draw(words) {
    focus.selectAll("text")
         .data(words)
         .enter().append("text")
         .style("font-size", function(d) { return xScale(d.value) + "px"; })
         .style("font-family", "Impact")
         .style("fill", function(d, i) { return color(i); })
         .attr("text-anchor", "middle")
         .attr("transform", function(d) {
           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
         })
         .text(function(d) { return d.key; })
         .on('click', handleMouseClick)
         .on('mouseover', handleMouseOver)
         .on('mouseout', handleMouseOut);
  }

  function handleMouseOver(d) {
    var group = focus.append('g')
        .attr('id', 'story-titles');
    var base = d.y - d.size;
    group.selectAll('text')
         .data([d.value])
         .enter()
        .append('text')
         .attr('x', d.x)
         .attr('y', function(title, i) {
           return (base - i*14);
         })
         .attr('text-anchor', 'left')
         .text(function(d) { return (d > 1 ? d+" occurrences" : d+" occurrence")});

    var bbox = group.node().getBBox();
    var bboxPadding = 5;

    // place a white background to see text more clearly
    var rect = group.insert('rect', ':first-child')
                  .attr('x', bbox.x)
                  .attr('y', bbox.y)
                  .attr('width', bbox.width + bboxPadding)
                  .attr('height', bbox.height + bboxPadding)
                  .attr('rx', 10)
                  .attr('ry', 10)
                  .attr('class', 'label-background-strong');
  }

  function handleMouseClick(d) {

    var group = d3.select('#dialog');
    var base = d.y - d.size;
      $( "#ui-id-1" ).html("Tweets related to '"+d.key+"'");
    $("#dialog" ).empty()
    group.selectAll('text')
         .data(data['tweet_info'][d.key])
         .enter().append('p')
         .attr('x', d.x)
         .attr('y', function(title, i) {
           return (base - i*14);
         })
         .attr('text-anchor', 'left')
         .html(function(title,i) {
             let link = 'https://twitter.com/'+title.screen_name
             let td_1 = i+1 +'. <a  target="_blank" href='+link+'>' +
                 '<SPAN STYLE="text-decoration:underline; color: blue">' +title.screen_name+ '</SPAN></a>'

             let table = '<table><tr><td>'+td_1+', '+title.time+'</td></tr>' +
                 '<tr><td>'+title.text+'</td></tr></table>'
             return table;
         });

    $("#dialog").dialog("open").css({height:"300px", overflow:"auto"});
    d3.select('#story-titles').remove();
  }

  function handleMouseOut(d) {
    d3.select('#story-titles').remove();
    d3.select('#tweets').remove();
  }
}