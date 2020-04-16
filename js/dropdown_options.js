let dropdown_options =
    [
        { value: "snt_age",
          text: "Sentiment Distribution over Age Group" },
        { value: "snt_gender",
          text: "Sentiment Distribution over Gender Group" }
  ]

// populate drop-down
d3.select("#dropdown")
    .selectAll("option")
    .data(dropdown_options)
    .enter()
    .append("option")
    .attr("value", function(option) { return option.value; })
    .text(function(option) { return option.text; });

// initial dataset on load
let selected_dataset = "snt_age";
// dropdown dataset selection
let dropDown = d3.select("#dropdown");
dropDown.on("change", function() {
    // newly selected dataset includes downtown
    d3.select("#downtown").property("checked", true);
    checked = true;
    selected_dataset = d3.event.target.value;
    updateMap(selected_dataset)
});