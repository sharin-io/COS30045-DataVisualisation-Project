const width = 1200;
const height = 900;
const svg = d3.select("#map");
const tooltip = d3.select("#tooltip");
const yearSlider = document.getElementById("yearSlider");
const yearDisplay = document.getElementById("yearDisplay");
const playButton = document.getElementById("playButton");

const color = d3.scaleSequential(d3.interpolateYlOrRd)
    .domain([0, 30]); // Define the color range for the birth rate

const projection = d3.geoMercator()
    .center([115, 5])  // Centered on ASEAN region
    .scale(1000)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Load world map data and birth rate data
Promise.all([
    d3.json("../data/asia.geojson"),
    d3.csv("../data/birthrate.csv")
]).then(([worldData, birthData]) => {
    const birthRates = {};
    birthData.forEach(d => {
        const countryCode = d['Country Code'];
        if (!birthRates[countryCode]) {
            birthRates[countryCode] = {};
        }
        birthRates[countryCode][d.Year] = +d['Birth Rate'];
    });

    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8])  // Define zoom limits
        .on("zoom", (event) => {
            g.attr("transform", event.transform);  // Apply zoom and pan to the group
        });

    // Apply zoom behavior to the SVG container
    svg.call(zoom);

    // Create the group element to hold map paths
    const g = svg.append("g");

    // Update map function
    function updateMap(year) {
        g.selectAll(".country")
            .data(worldData.features)
            .join("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", d => {
                const rate = birthRates[d.id]?.[year];
                return rate ? color(rate) : "#ccc";
            })
            .on("mouseover", (event, d) => {
                const rate = birthRates[d.id]?.[year];
                tooltip
                    .style("opacity", 1)
                    .html(`
                    <strong>${d.properties.name}</strong><br/>
                    Birth Rate: ${rate ? rate.toFixed(1) : "No data"} per 1,000 people<br/>
                    Year: ${year}
                `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            })
            .on("click", (event, d) => {
                const rate = birthRates[d.id]?.[year];
                // Optionally handle click event for more detailed info
                alert(`${d.properties.name} Birth Rate in ${year}: ${rate ? rate.toFixed(1) : "No data"} per 1,000 people`);
            });
    }

    // Initialize map with current year
    updateMap(2023);

    // Handle year slider input
    yearSlider.addEventListener("input", (event) => {
        const selectedYear = parseInt(event.target.value);
        yearDisplay.textContent = selectedYear;
        updateMap(selectedYear);
    });

    // Handle play/pause button
    let isPlaying = false;
    let animationInterval;
    playButton.addEventListener("click", () => {
        if (isPlaying) {
            clearInterval(animationInterval);
            playButton.textContent = "Play Animation";
        } else {
            playButton.textContent = "Pause Animation";
            let currentYear = parseInt(yearSlider.value);
            animationInterval = setInterval(() => {
                currentYear++;
                if (currentYear > 2023) {
                    currentYear = 1990;
                }
                yearSlider.value = currentYear;
                yearDisplay.textContent = currentYear;
                updateMap(currentYear);
            }, 200);
        }
        isPlaying = !isPlaying;
    });
    // Handle hover effect for country
    function updateMap(year) {
        g.selectAll(".country")
            .data(worldData.features)
            .join("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", d => {
                const rate = birthRates[d.id]?.[year];
                return rate ? color(rate) : "#ccc";
            })
            .on("mouseover", (event, d) => {
                const rate = birthRates[d.id]?.[year];
                const countryName = d.properties.name;
                const birthRate = rate ? rate.toFixed(1) : "No data";

                // Position the tooltip near the country
                const [x, y] = path.centroid(d); // Get the center coordinates of the country

                tooltip
                    .style("opacity", 1)
                    .html(`
                    <strong>${countryName}</strong><br/>
                    Birth Rate: ${birthRate} per 1,000 people<br/>
                    Year: ${year}
                `)
                    .style("left", `${x + 10}px`) // Position the tooltip slightly to the right
                    .style("top", `${y - 20}px`); // Position the tooltip above the country
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0); // Hide the tooltip when mouse leaves
            })
            .on("click", (event, d) => {
                const rate = birthRates[d.id]?.[year];
                alert(`${d.properties.name} Birth Rate in ${year}: ${rate ? rate.toFixed(1) : "No data"} per 1,000 people`);
            });
    }
}).catch(error => {
    document.getElementById('error-container').innerText = 'Failed to load data. Please try again later.';
    console.error('Error loading data:', error);
});
