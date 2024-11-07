// Life expectancy data (Total) for the years 2013-2022
const countries = [
    "Brunei Darussalam", "Cambodia", "Indonesia", "Lao", "Malaysia",
    "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"
];

const data = [
    [78, 77.2, 77.7, 77.8, 77.3, 78.5, 77.7, 77.9, 77.6, 76.4], // Brunei Darussalam
    [66.7, 67.6, 68.3, 69.1, 69.9, 70.6, 75.7, 72, 72.7, 73.3],  // Cambodia
    [70.4, 70.6, 70.8, 71.1, 71.1, 71.2, 71.3, 71.6, 71.6, 71.9], // Indonesia
    [67, 68, 68, 65, 65, 66, 66, 67, 67, 67],                   // Lao
    [74.5, 74.5, 74.6, 74.4, 74.4, 74.6, 74.8, 74.5, 74.5, 73.4], // Malaysia
    [67.8, 63.9, 64.4, 65, 65.5, 66.1, 66.5, 66.8, 66.8, 67.1], // Myanmar
    [null, null, 72.7, null, null, null, null, null, null, null], // Philippines (NA for missing data)
    [82.4, 82.6, 82.9, 83, 83.2, 83.4, 83.7, 83.7, 83.2, 83],   // Singapore
    [null, null, null, 74.8, 75.5, 75.8, 75.7, 76.2, null, null], // Thailand (NA for missing data)
    [73.1, 73.2, 73.3, 73.4, 73.5, 73.5, 73.6, 73.7, 73.6, 73.6] // Vietnam
];

// Prepare the data: Flatten the data into an array of objects (each with a country, year, and life expectancy value)
const years = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const formattedData = [];

countries.forEach((country, i) => {
    years.forEach((year, j) => {
        if (data[i][j] !== null) { // Ignore missing data (NA)
            formattedData.push({
                Country: country,
                Year: year,
                LifeExpectancy: data[i][j]
            });
        }
    });
});

// Dimensions and margins for the chart
const width = 1000;
const height = 600;
const margin = { top: 50, right: 20, bottom: 80, left: 120 }; // Increased left margin

// Select the div where the heatmap will be appended
const svg = d3.select("#life-expectancy-chart")  // Target the existing div with this ID
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

// Define scales for the axes
const x = d3.scaleBand()
    .domain(years)
    .range([margin.left, width - margin.right])
    .padding(0.05);

const y = d3.scaleBand()
    .domain(countries)
    .range([margin.top, height - margin.bottom])
    .padding(0.05);

// Define a red color scale (for heatmap coloring)
const color = d3.scaleSequential(d3.interpolateReds)
    .domain([d3.min(formattedData, d => d.LifeExpectancy), d3.max(formattedData, d => d.LifeExpectancy)]);

// Create and append the rectangles for the heatmap
svg.selectAll(".cell")
    .data(formattedData)
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", d => x(d.Year))
    .attr("y", d => y(d.Country))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.LifeExpectancy))
    .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "#000").attr("stroke-width", 1);
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Country: ${d.Country}<br>Year: ${d.Year}<br>Life Expectancy: ${d.LifeExpectancy}`)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");
        tooltip.transition().duration(500).style("opacity", 0);
    });

// Add x-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-family", "Arial")
    .attr("dx", "-.8em")
    .attr("dy", ".15em");

// Add y-axis with rotated text
svg.append("g")
    .attr("transform", `translate(${margin.left},0.5)`)
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("font-size", "12px")
    .style("font-family", "Arial")
    .attr("transform", "rotate(-45)") // Rotate the text for better readability
    .attr("text-anchor", "end"); // Align text to the end of the label (rotated)

// Add title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Total Life Expectancy Across ASEAN Countries (2013-2022)");

// Add tooltips
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background-color", "#fff")
    .style("border", "1px solid #ddd")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.2)");
