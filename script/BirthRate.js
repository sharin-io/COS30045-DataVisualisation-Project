var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
    
    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoMercator()
      .scale(1000)  // Increased scale for larger map
      .center([100,15])
      .translate([width / 2, height / 2]);
    
    // Data and color scale
    var data = d3.map();
    var colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);
    
    // Load external data and boot
    d3.queue()
      .defer(d3.json, "SEA.json")
      .defer(d3.csv, "brate.csv", function(d) { data.set(d.code, +d.pop); })
      .await(ready);
    
    function ready(error, topo) {
      let mouseOver = function(d) {
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .5)
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("stroke", "black")
      }
    
      let mouseLeave = function(d) {
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .8)
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")
      }
    
      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
          .attr("d", d3.geoPath()
            .projection(projection)
          )
          .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
          })
          .style("stroke", "transparent")
          .attr("class", function(d){ return "Country" } )
          .style("opacity", .8)
          .on("mouseover", mouseOver )
          .on("mouseleave", mouseLeave )
    }
