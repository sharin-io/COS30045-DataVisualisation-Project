 const width = 800;
        const height = 800;
        const svg = d3.select("svg");
        const tooltip = d3.select("#tooltip");
        const errorContainer = d3.select("#error-container");

        // Set up color scale
        const color = d3.scaleSequential(d3.interpolateYlOrRd)
            .domain([0, 30]);

        const projection = d3.geoNaturalEarth1()
            .scale(380)
            .center([115,-5])
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Create legend
        const legendWidth = 300;
        const legendHeight = 20;
        const legendSvg = d3.select("#legendSvg");
        
        const legendScale = d3.scaleLinear()
            .domain([0, 30])
            .range([0, legendWidth]);

        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5);

        const defs = legendSvg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "legend-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        linearGradient.selectAll("stop")
            .data(d3.range(0, 1.1, 0.1))
            .enter()
            .append("stop")
            .attr("offset", d => d * 100 + "%")
            .attr("stop-color", d => color(d * 30));

        legendSvg.append("rect")
            .attr("x", 50)
            .attr("y", 10)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#legend-gradient)");

        legendSvg.append("g")
            .attr("transform", `translate(50, ${legendHeight + 10})`)
            .call(legendAxis);

        // Create zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        svg.call(zoom);

        const g = svg.append("g");

        function zoomed(event) {
            g.attr("transform", event.transform);
        }

        let lastClicked = null; // Track the last clicked region

        function clicked(event, d) {
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            event.stopPropagation();

            // Zoom in on the clicked region
            svg.transition().duration(750)
                .call(zoom.transform, d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2));

            // Update the last clicked region
            lastClicked = d;
        }

        // Click on the SVG to zoom out to the initial state
        svg.on("click", function(event) {
            if (lastClicked) {
                // Reset zoom if a region was clicked and now the map is clicked again
                svg.transition().duration(750)
                    .call(zoom.transform, d3.zoomIdentity);
                lastClicked = null; // Reset last clicked region
            }
        });

        // Load world map data first
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .then(worldData => {
                // After world map loads successfully, load CSV data
                return d3.csv("birthrate.csv")
                    .then(birthData => {
                        // Process birth rate data
                        const birthRates = {};
                        birthData.forEach(d => {
                            const countryCode = d['Country Code'].padStart(3, '0');
                            if (!birthRates[countryCode]) {
                                birthRates[countryCode] = {};
                            }
                            birthRates[countryCode][d.Year] = +d['Birth Rate'];
                        });

                        // Update map function
                        function updateMap(year) {
                            g.selectAll(".country")
                                .data(worldData.features)
                                .join("path")
                                .attr("class", "country")
                                .attr("d", path)
                                .attr("fill", d => {
                                    const countryCode = d.id;
                                    const rate = birthRates[countryCode] ? birthRates[countryCode][year] : null;
                                    return rate ? color(rate) : "#ccc";
                                })
                                .on("mouseover", (event, d) => {
                                    const countryCode = d.id;
                                    const rate = birthRates[countryCode] ? birthRates[countryCode][year] : null;
                                    tooltip.style("opacity", 1)
                                        .html(`
                                            <strong>${d.properties.name}</strong><br/>
                                            Birth Rate: ${rate ? rate.toFixed(1) : "No data"} per 1,000
                                        `)
                                        .style("left", (event.pageX + 10) + "px")
                                        .style("top", (event.pageY - 10) + "px");
                                })
                                .on("mouseout", () => {
                                    tooltip.style("opacity", 0);
                                })
                                .on("click", clicked);
                        }

                        // Initialize map
                        updateMap(2023);

                        // Set up year slider
                        const yearSlider = document.getElementById("yearSlider");
                        const yearDisplay = document.getElementById("yearDisplay");
                        
                        yearSlider.addEventListener("input", (event) => {
                            const year = parseInt(event.target.value);
                            yearDisplay.textContent = year;
                            updateMap(year);
                        });
                    })
                    .catch(error => {
                        throw new Error(`Error loading CSV data: ${error.message}`);
                    });
            })
            .catch(error => {
                console.error("Error:", error);
                errorContainer.html(`
                    <div class="error-message">
                        <h3>Error Loading Data</h3>
                        <p>${error.message}</p>
                        <p>Please check:</p>
                        <ul>
                            <li>That birth.csv is in the same directory as your HTML file</li>
                            <li>That you're running this through a web server (not opening the file directly)</li>
                            <li>That your CSV file is properly formatted</li>
                        </ul>
                    </div>
                `);
            });
