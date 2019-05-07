// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("body")
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
    });
    var xBandScale = d3.scaleBand()
    .domain(data.map(d => d.healthcareLow))
    .range([0, chartWidth])
    .padding(0.1);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)])
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xBandScale);
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
    .attr("cx", d => xBandScale(d.healthcareLow))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.healthcareLow} ${d.poverty}`);
    });

});
  