//Load in contents of CSV file, and do things to the data.

var tweets;
d3.json(json_file, function(error, myData) {
    if (error) {
        console.log("Had an error loading file.");
    }
    // We'll be using simpler data as values, not objects.
    var topics = myData.topics;
    tweets = myData.tweet_info;
    // console.log(topics)
    var myArray = [];
    Object.keys(topics).forEach(function(d, i){
        let words = topics[d]
        let row_data = [d]
        Array.prototype.push.apply(row_data, words);
        // Add a new array with the values of each:
        myArray.push(row_data);
    });

    // // You could also have made the new array with a map function!
    // //using colors and fonts from the UNICEF Style Guide
    var table = d3.select("#table")
        .append("table")
        .attr('class', 'table table-bordered table-sm');
    var header = table
        .append("thead")
        .attr('class', 'thead-dark')
        .append("tr");
    header
        .selectAll("th")
        .data(["Topics", "1", "2","3", "4","5", "6","7", "8","9", "10"])
        .enter()
        .append("th")
        .attr('scope', 'col')
        .text(function(d) { return d; });
    var tablebody = table.append("tbody");
    rows = tablebody
            .selectAll("tr")
            .data(myArray)
            .enter()
            .append("tr");
    // We built the rows using the nested array - now each row has its own array.
    rows.selectAll("th")
        // each row has data associated; we get it and enter it for the cells.
        .data(function(d) { return [d[0]];})
        .enter()
        .append("th").attr('scope', 'col')
        .text(function(d) {return d;});
    rows.selectAll("td")
        // each row has data associated; we get it and enter it for the cells.
        .data(function(d) { return d.slice(1, d.length);})
        .enter()
        .append("td").attr('class', 'col-md-1')
        .text(function(d) {return d;})
        .on('click', handleMouseClick);
});

function handleMouseClick(d) {

    if(d.startsWith('topic')){
        return
    }
    var group = d3.select('#dialog');
    var base = d.y - d.size;
    $("#ui-id-1" ).html("Tweets related to '"+d+"'");
    $("#dialog" ).empty()
    group.selectAll('text')
         .data(tweets[d])
         .enter().append('p')
         .attr('text-anchor', 'left')
         .text(function(title) { return title.text; });

    $("#dialog").dialog("open").css({height:"300px", overflow:"auto"});;
  }