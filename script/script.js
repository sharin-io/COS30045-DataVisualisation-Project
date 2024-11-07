// Width and height of the radar chart
var w = 700,
    h = 600;

// Color scale for the chart
var colorscale = d3.scale.category10();

// Legend titles for each country
var LegendOptions = ['Brunei', 'Cambodia', 'Indonesia', 'Lao', 'Phillipines', 'Malaysia', 'Myanmar', 'Singapore', 'Vietnam', 'Thailand'];

// Data for the radar chart (formatted to fit)
var d = [
  // Brunei (restructured to fit the original format)
  [
    {axis: "2013", value: 0.777},
    {axis: "2014", value: 0.758},
    {axis: "2015", value: 0.778},
    {axis: "2016", value: 0.769},
    {axis: "2017", value: 0.764},
    {axis: "2018", value: 0.775},
    {axis: "2019", value: 0.766},
    {axis: "2020", value: 0.771},
    {axis: "2021", value: 0.763},
    {axis: "2022", value: 0.745}
  ],
  // Cambodia
  [
    {axis: "2013", value: 0.648},
    {axis: "2014", value: 0.656},
    {axis: "2015", value: 0.664},
    {axis: "2016", value: 0.671},
    {axis: "2017", value: 0.679},
    {axis: "2018", value: 0.686},
    {axis: "2019", value: 0.742},
    {axis: "2020", value: 0.699},
    {axis: "2021", value: 0.706},
    {axis: "2022", value: 0.712}
  ],
  // Indonesia
  [
    {axis: "2013", value: 0.685},
    {axis: "2014", value: 0.689},
    {axis: "2015", value: 0.689},
    {axis: "2016", value: 0.681},
    {axis: "2017", value: 0.692},
    {axis: "2018", value: 0.693},
    {axis: "2019", value: 0.694},
    {axis: "2020", value: 0.696},
    {axis: "2021", value: 0.697},
    {axis: "2022", value: 0.699}
  ],
  // Lao
  [
    {axis: "2013", value: 0.650},
    {axis: "2014", value: 0.660},
    {axis: "2015", value: 0.650},
    {axis: "2016", value: 0.630},
    {axis: "2017", value: 0.650},
    {axis: "2018", value: 0.640},
    {axis: "2019", value: 0.650},
    {axis: "2020", value: 0.650},
    {axis: "2021", value: 0.650},
    {axis: "2022", value: 0.660}
  ],
  // Malaysia
  [
    {axis: "2013", value: 0.723},
    {axis: "2014", value: 0.724},
    {axis: "2015", value: 0.725},
    {axis: "2016", value: 0.721},
    {axis: "2017", value: 0.721},
    {axis: "2018", value: 0.723},
    {axis: "2019", value: 0.725},
    {axis: "2020", value: 0.725},
    {axis: "2021", value: 0.723},
    {axis: "2022", value: 0.713}
  ],
  // Myanmar
  [
    {axis: "2013", value: 0.655},
    {axis: "2014", value: 0.593},
    {axis: "2015", value: 0.597},
    {axis: "2016", value: 0.603},
    {axis: "2017", value: 0.608},
    {axis: "2018", value: 0.613},
    {axis: "2019", value: 0.620},
    {axis: "2020", value: 0.620},
    {axis: "2021", value: 0.627},
    {axis: "2022", value: 0.628}
  ],
  // Philippines (handle missing data)
  [
    {axis: "2013", value: 0},
    {axis: "2014", value: 0},
    {axis: "2015", value: 0.696},
    {axis: "2016", value: 0},
    {axis: "2017", value: 0},
    {axis: "2018", value: 0},
    {axis: "2019", value: 0},
    {axis: "2020", value: 0.713},
    {axis: "2021", value: 0.713},
    {axis: "2022", value: 0.713}
  ],
  // Singapore
  [
    {axis: "2013", value: 0.801},
    {axis: "2014", value: 0.803},
    {axis: "2015", value: 0.805},
    {axis: "2016", value: 0.807},
    {axis: "2017", value: 0.809},
    {axis: "2018", value: 0.812},
    {axis: "2019", value: 0.814},
    {axis: "2020", value: 0.813},
    {axis: "2021", value: 0.808},
    {axis: "2022", value: 0.807}
  ],
  // Thailand (handle missing data)
  [
    {axis: "2013", value: 0},
    {axis: "2014", value: 0},
    {axis: "2015", value: 0},
    {axis: "2016", value: 0.712},
    {axis: "2017", value: 0.718},
    {axis: "2018", value: 0.720},
    {axis: "2019", value: 0.719},
    {axis: "2020", value: 0.724},
    {axis: "2021", value: 0.735},
    {axis: "2022", value: 0.736}
  ],
  // Vietnam
  [
    {axis: "2013", value: 0.705},
    {axis: "2014", value: 0.706},
    {axis: "2015", value: 0.707},
    {axis: "2016", value: 0.708},
    {axis: "2017", value: 0.709},
    {axis: "2018", value: 0.709},
    {axis: "2019", value: 0.710},
    {axis: "2020", value: 0.710},
    {axis: "2021", value: 0.711},
    {axis: "2022", value: 0.711}
  ]
];

// Radar chart configuration
var mycfg = {
  w: w,
  h: h,
  maxValue: 1,  // Max value of the radar chart (1 corresponds to 100%)
  levels: 6,
  ExtraWidthX: 300
};

// Draw the radar chart
RadarChart.draw("#chart", d, mycfg);

// Legend setup
var svg = d3.select('#body').append('svg')
  .attr("width", w + 1000)
  .attr("height",h + 500);

// Title for the legend
var text = svg.append("text")
  .attr("class", "title")
  .attr('transform', 'translate(90,0)')
  .attr("x", w + 200)
  .attr("y", 150)
  .attr("font-size", "12px")
  .attr("fill", "#404040")
  .text("Age of Males by Country");

// Legend creation
var legend = svg.append("g")
  .attr("class", "legend")
  .attr("height",  200)
  .attr("width", w + 100)
  .attr('transform', 'translate(90,20)');

  var yOffset = 150; 
// Color squares for the legend
legend.selectAll('rect')
  .data(LegendOptions)
  .enter()
  .append("rect")
  .attr("x", w + 200)
  .attr("y", function(d, i){ return i * 20 + yOffset;})
  .attr("width", 15)
  .attr("height", 15)
  .style("fill", function(d, i){ return colorscale(i);});

// Text labels for the legend
legend.selectAll('text')
  .data(LegendOptions)
  .enter()
  .append("text")
  .attr("x",  w + 220)
  .attr("y", function(d, i){ return i * 20 + 9 + yOffset;})
  .attr("font-size", "13px")
  .attr("fill", "#737373")
  .text(function(d) { return d; });
