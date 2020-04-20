//Load in contents of CSV file, and do things to the data.
d3.csv("data/water_improvement_data.csv", function(error, myData) {
    if (error) {
        console.log("Had an error loading file.");
    }
    // We'll be using simpler data as values, not objects.
    var myArray = [];
    myData.forEach(function(d, i){
        // now we add another data object value, a calculated value.
        // here we are making strings into numbers using type coercion
        d.year1990 = +d.year1990;
        d.year2015 = +d.year2015;
        d.difference = d.year2015 - d.year1990;
        if (d.name === "Developing regions") {
            d.name = "Developing Regions";
        }
        if (d.name === "Developed regions") {
            d.name = "Deveoloped Regions";
        }
        // Add a new array with the values of each:
        myArray.push([d.name, d.year1990, d.year2015, d.difference]);
    });
    console.log(myData);
    console.log(myArray);
    //sort data by difference
    myArray.sort(function (a, b) {
        return a[3]-b[3];
    });
    // You could also have made the new array with a map function!
    //using colors and fonts from the UNICEF Style Guide
    var table = d3.select("#table").append("table");
    var header = table.append("thead").append("tr");
    header
        .selectAll("th")
        .data(["Region", "1990", "2015", "Difference"])
        .enter()
        .append("th")
        .text(function(d) { return d; });
    var tablebody = table.append("tbody");
    rows = tablebody
            .selectAll("tr")
            .data(myArray)
            .enter()
            .append("tr");
    // We built the rows using the nested array - now each row has its own array.
    cells = rows.selectAll("td")
        // each row has data associated; we get it and enter it for the cells.
            .data(function(d) {
                console.log(d);
                return d;
            })
            .enter()
            .append("td")
            .text(function(d) {
                return d;
            });
});