// Life expectancy data for females
const countries = [
  "Brunei Darussalam",
  "Cambodia",
  "Indonesia",
  "Lao",
  "Malaysia",
  "Myanmar",
  "Phillipines",
  "Singapore",
  "Thailand",
  "Vietnam"
];

const data = [
  [78.7, 78.9, 78.3], // Brunei Darussalam
  [74.2, 74.8, 75.5], // Cambodia
  [73.5, 73.6, 73.8], // Indonesia
  [69, 69, 69],       // Lao
  [77.2, 77, 75.8],  // Malaysia
  [71.5, 71.1, 71.3], // Myanmar
  [77.5, 77.5, 77.5], // Phillipines
  [85.9, 85.5, 85.2], // Singapore
  [80.1, 80.5, 80.7], // Thailand
  [76.4, 76.4, 76.4]  // Vietnam
];

// Calculate average values
const averages = data.map(d => d3.mean(d));

// Dimensions and margins
const width = 1200;
const height = 600;
const marginTop = 20;
const marginRight = 100;
const marginBottom = 50;
const marginLeft = 60;

// Create a tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background", "rgba(255, 255, 255, 0.9)")
  .style("padding", "10px")
  .style("border", "2px solid #007bff")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  .style("opacity", 0);

// Create SVG
const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width)
  .attr("height", height)
  .attr("style", "max-width: 100%; height: auto;");

let showAverages = true; // State for showing averages

// Color scale
const color = d3.scaleLinear()
  .domain([0, 1, 2])
  .range(["#4c8bf5", "#03cb64", "#fb7afd"]);

// Draw bars
function drawBars(order = 'asc') {
  // Sort data based on average values
  const sortedData = [...data].map((d, i) => ({ country: countries[i], data: d, average: averages[i] }));
  sortedData.sort((a, b) => order === 'asc' ? a.average - b.average : b.average - a.average);

  const stackData = d3.stack().keys([0, 1, 2])(sortedData.map(d => d.data));

  const x = d3.scaleBand()
    .domain(sortedData.map(d => d.country))
    .rangeRound([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(stackData, d => d3.max(d, d => d[1]))])
    .range([height - marginBottom, marginTop]);

  svg.selectAll("*").remove(); // Clear previous bars

  // Draw stacked bars
  svg.selectAll("g")
    .data(stackData)
    .join("g")
    .attr("fill", (d, i) => color(i))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(sortedData[i].country))
    .attr("y", d => y(d[1]))
    .attr("width", x.bandwidth() * 0.75) // Adjust width of the columns
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("rx", 7) // Rounded corners
    .attr("ry", 7) // Rounded corners
    .on("mouseover", function (event, d) {
      const rectIndex = d3.select(this.parentNode).datum().indexOf(d);
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`
        <strong>${sortedData[rectIndex].country}</strong><br>
        2020: ${sortedData[rectIndex].data[0].toFixed(2)} years<br>
        2021: ${sortedData[rectIndex].data[1].toFixed(2)} years<br>
        2022: ${sortedData[rectIndex].data[2].toFixed(2)} years
      `)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Conditionally draw average bars
  if (showAverages) {
    svg.selectAll(".average-bar")
      .data(sortedData)
      .join("rect")
      .attr("class", "average")
      .attr("x", (d, i) => x(d.country) + (x.bandwidth() / 2) - 5)
      .attr("y", d => y(d.average))
      .attr("width", 10) // Adjust average bar width
      .attr("height", d => height - marginBottom - y(d.average))
      .attr("fill", "#ff9800") // Color for average bars
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.country} Average:</strong> ${d.average.toFixed(2)} years`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }

  // Add x-axis with stylings
  const xAxis = d3.axisBottom(x).tickSizeOuter(0);
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)") // Rotate x-axis labels
    .attr("text-anchor", "end")
    .attr("font-size", "12px")
    .style("font-weight", "bold"); // Make labels bold

  // Create a legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width - marginRight}, ${marginTop})`); // Positioning the legend

  const legendItems = legend.selectAll(".legend-item")
    .data(["2020", "2021", "2022"]) // Assuming these are the years you want to label
    .enter().append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Spacing items vertically

  // Append colored rectangles to the legend using the color scale
  legendItems.append("rect")
    .attr("width", 24)
    .attr("height", 20)
    .style("fill", (d, i) => color(i)); // Use the same colors as the bars

  // Append text labels to the legend
  legendItems.append("text")
    .attr("x", 30)
    .attr("y", 15) // Centering text vertically
    .text(d => d);
}

// Initial draw
drawBars();

// Sort buttons
const sortButtons = d3.select("body").append("div")
  .style("margin", "20px 0");

sortButtons.append("button")
  .text("Sort Ascending")
  .attr("class", "sort-button ascending") // Add class for styling
  .on("click", () => drawBars('asc'));

sortButtons.append("button")
  .text("Sort Descending")
  .attr("class", "sort-button descending") // Add class for styling
  .on("click", () => drawBars('desc'));

// Toggle averages button
sortButtons.append("button")
  .text("Toggle Averages")
  .attr("class", "sort-button toggle-averages") // Add class for styling
  .on("click", () => {
    showAverages = !showAverages; // Toggle the state
    drawBars(); // Redraw the chart
  });

// Attach to document
document.body.appendChild(chart.node());
