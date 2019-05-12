// @TODO: YOUR CODE HERE!
// function makeResponsive() {
var svgWidth = 600;
var svgHeight = 400;

var chartMargin = {
    top: 70,
    right: 70,
    bottom: 70,
    left: 70
  };

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  d3.csv("assets/data/data.csv").then(function(data) {
    // change string (from CSV) into number format
    console.log(data);
    data.forEach(function(d) {
      d.poverty = +d.poverty;
      d.abbr = d.abbr;
    //   d.age = +d.age;
    //   d.income = +d.income;
    //   d.obesity = +d.obesity;
    //   d.smokes = +d.smokes;
      d.healthcareLow = +d.healthcareLow;
      console.log(d.poverty);
    //   console.log(d.age);
    //   console.log(d.income);
    //   console.log(d.obesity);
    //   console.log(d.smokes);
      console.log(d.healthcareLow);
      console.log(d.abbr);
    });

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty)-1.5, d3.max(data, d => d.poverty)])
    .range([0, chartWidth]);
    //.padding(0.1);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.healthcareLow)-1, d3.max(data, d => d.healthcareLow)])
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    chartGroup.append("g")
    .call(leftAxis);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcareLow))
    .attr("r", "7")
    .classed("stateCircle", true);

    chartGroup.append("text")
    .selectAll("tspan")
    .data(data)
    .enter()
    .append("tspan")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcareLow-.2))
    .text(function(d) {return d.abbr})
    .classed("stateText", true);

    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${d.healthcareLow}%<br>${d.poverty}%`);
    });

    chartGroup.call(toolTip);
    
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
       
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top -10})`)
      .attr("class", "aText")
      .text("In Poverty (%)");
});
// }
// makeResponsive();
// d3.select(window).on("resize", makeResponsive);  