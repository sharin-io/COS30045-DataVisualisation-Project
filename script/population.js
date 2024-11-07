// Set the dimensions and margins of the graph
var margin = { top: 30, right: 100, bottom: 70, left: 130 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Hard-coded data
var data = [
  { Country: "Brunei Darussalam", "2003": 346649, "2004": 352921, "2005": 358930, "2006": 364669, "2007": 370884, "2008": 377800, "2009": 384964, "2010": 392340, "2011": 399395, "2012": 405566, "2013": 411206, "2014": 416754, "2015": 422224, "2016": 427573, "2017": 432788, "2018": 437813, "2019": 442687, "2020": 447412, "2021": 451723, "2022": 455374, "2023": 458959 },
  { Country: "Cambodia(KHM)", "2003": 13050978, "2004": 13244739, "2005": 13439204, "2006": 13639030, "2007": 13841775, "2008": 14053479, "2009": 14276819, "2010": 14500732, "2011": 14722587, "2012": 14945090, "2013": 15170212, "2014": 15396771, "2015": 15623253, "2016": 15852802, "2017": 16073374, "2018": 16274521, "2019": 16481304, "2020": 16725482, "2021": 16974308, "2022": 17201717, "2023": 17423881 },
  { Country: "Indonesia (IDN)", "2003": 225048004, "2004": 227926647, "2005": 230871649, "2006": 233951650, "2007": 237062339, "2008": 240157901, "2009": 243220024, "2010": 246305326, "2011": 249470029, "2012": 252698526, "2013": 255852466, "2014": 258877397, "2015": 261799249, "2016": 264627428, "2017": 267346655, "2018": 269951847, "2019": 272489379, "2020": 274814864, "2021": 276758056, "2022": 278830529, "2023": 281190068 },
  { Country: "Lao (LAO)", "2003": 5697945, "2004": 5781627, "2005": 5869531, "2006": 5963199, "2007": 6056238, "2008": 6148974, "2009": 6241649, "2010": 6334198, "2011": 6426595, "2012": 6518981, "2013": 6611385, "2014": 6703170, "2015": 6801650, "2016": 6908800, "2017": 7018149, "2018": 7128045, "2019": 7237634, "2020": 7346533, "2021": 7453191, "2022": 7559007, "2023": 7665002 },
  { Country: "Malaysia(MYS)", "2003": 24679604, "2004": 25256771, "2005": 25836073, "2006": 26417906, "2007": 26998384, "2008": 27570054, "2009": 28124780, "2010": 28655771, "2011": 29162033, "2012": 29662835, "2013": 30174269, "2014": 30696133, "2015": 31232796, "2016": 31789694, "2017": 32355642, "2018": 32910962, "2019": 33440588, "2020": 33889555, "2021": 34282405, "2022": 34695494, "2023": 35126295 },
  { Country: "Myanmar(MMR)", "2003": 46667190, "2004": 47068779, "2005": 47438362, "2006": 47785142, "2007": 48125046, "2008": 48390791, "2009": 48660458, "2010": 49024376, "2011": 49419824, "2012": 49837450, "2013": 50262658, "2014": 50681634, "2015": 51089060, "2016": 51495702, "2017": 51894938, "2018": 52272246, "2019": 52640718, "2020": 53016525, "2021": 53387102, "2022": 53756790, "2023": 54133801 },
  { Country: "Phillipines (PHL)", "2003": 84731838, "2004": 86394513, "2005": 88015957, "2006": 89508993, "2007": 91075179, "2008": 92699093, "2009": 94384256, "2010": 96337126, "2011": 98248616, "2012": 100175512, "2013": 102076337, "2014": 103767129, "2015": 105312986, "2016": 106735723, "2017": 108119693, "2018": 109465284, "2019": 110804685, "2020": 112081271, "2021": 113100946, "2022": 113964342, "2023": 114891200 },
  { Country: "Singapore(SGP)", "2003": 4138241, "2004": 4172766, "2005": 4268361, "2006": 4407064, "2007": 4596515, "2008": 4806742, "2009": 4968573, "2010": 5077019, "2011": 5182242, "2012": 5293344, "2013": 5385589, "2014": 5457899, "2015": 5525343, "2016": 5577937, "2017": 5604087, "2018": 5634367, "2019": 5669562, "2020": 5620150, "2021": 5546292, "2022": 5649886, "2023": 5789091 },
  { Country: "Thailand(THA)", "2003": 64868164, "2004": 65452051, "2005": 66062496, "2006": 66669274, "2007": 67267544, "2008": 67863398, "2009": 68467716, "2010": 69073693, "2011": 69692572, "2012": 70332211, "2013": 70985859, "2014": 71535746, "2015": 72099361, "2016": 72685411, "2017": 73262158, "2018": 73856158, "2019": 74452911, "2020": 75030142, "2021": 75572334, "2022": 76081618, "2023": 76538911 },
  { Country: "Vietnam(VNM)", "2003": 79563778, "2004": 80338978, "2005": 81088309, "2006": 82167900, "2007": 83633377, "2008": 85175789, "2009": 86460023, "2010": 87455150, "2011": 88468314, "2012": 89510357, "2013": 90573104, "2014": 91679583, "2015": 92823254, "2016": 94000115, "2017": 95176979, "2018": 96237319, "2019": 97173778, "2020": 98079196, "2021": 98935101, "2022": 99680656, "2023": 100352189 }
];

// Define years based on the keys of the data (excluding 'Country')
var years = Object.keys(data[0]).slice(1);

// Set up the x scale
var x = d3.scaleBand()
  .domain(data.map(function(d) { return d.Country; }))
  .range([0, width])
  .padding(0.2);

// Add the x-axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text") 
  .style("text-anchor", "middle")
  .attr("transform", "rotate(45)") 
  .style("font-size", "8px"); 

// Set up the y scale
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) {
    return d3.sum(years, function(key) { return +d[key]; });
  })])
  .range([height, 0]);

// Add the y-axis
svg.append("g")
  .call(d3.axisLeft(y));

// Set up the color scale
var color = d3.scaleOrdinal()
  .domain(years)
  .range(d3.schemeSet2);

// Stack the data for the years
var stackedData = d3.stack()
  .keys(years)(data);

// Add the bars for the stacked chart
var bars = svg.append("g")
  .selectAll("g")
  .data(stackedData)
  .enter().append("g")
  .attr("fill", function(d) { return color(d.key); });

// Add rectangles to each stack
bars.selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
  .attr("x", function(d) { return x(d.data.Country); })
  .attr("width", x.bandwidth())
  .attr("y", function(d) { return y(d[1]); })
  .attr("height", function(d) { return y(d[0]) - y(d[1]); })
  .on("mouseover", function(event, d) {
    // Show the tooltip
    tooltip.style("visibility", "visible")
      .text(d.data.Country + ": " + d.year + " - " + (d[1] - d[0]));

    // Highlight the current bar
    d3.select(this).style("opacity", 0.7);
  })
  .on("mousemove", function(event) {
    // Position the tooltip next to the mouse cursor
    tooltip.style("top", (event.pageY - 10) + "px")
      .style("left", (event.pageX + 10) + "px");
  })
  .on("mouseout", function() {
    // Hide the tooltip
    tooltip.style("visibility", "hidden");

    // Reset the bar opacity
    d3.select(this).style("opacity", 1);
  });

// Create a div element for the tooltip
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("background-color", "white")
  .style("border", "1px solid #ccc")
  .style("padding", "5px")
  .style("border-radius", "3px")
  .style("font-size", "12px")
  .style("box-shadow", "2px 2px 6px rgba(0,0,0,0.2)");
