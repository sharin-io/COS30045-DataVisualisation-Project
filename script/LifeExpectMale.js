
const data = [
  {
    country: "Brunei",
    years: [
      { year: 2013, ages: [77.7] },
      { year: 2014, ages: [75.8] },
      { year: 2015, ages: [77.8] },
      { year: 2016, ages: [76.9] },
      { year: 2017, ages: [76.4] },
      { year: 2018, ages: [77.5] },
      { year: 2019, ages: [76.6] },
      { year: 2020, ages: [77.1] },
      { year: 2021, ages: [76.3] },
      { year: 2022, ages: [74.5] },
    ]
  },
  {
    country: "Cambodia",
    years: [
      { year: 2013, ages: [64.8] },
      { year: 2014, ages: [65.6] },
      { year: 2015, ages: [66.4] },
      { year: 2016, ages: [67.1] },
      { year: 2017, ages: [67.9] },
      { year: 2018, ages: [68.6] },
      { year: 2019, ages: [74.2] },
      { year: 2020, ages: [69.9] },
      { year: 2021, ages: [70.6] },
      { year: 2022, ages: [71.2] }
    ]
  },
  // Add similar data for 9 more countries
  {
    country: "Indonesia",
    years: [
      { year: 2013, ages: [68.5] },
      { year: 2014, ages: [68.9] },
      { year: 2015, ages: [68.9] },
      { year: 2016, ages: [68.1] },
      { year: 2017, ages: [69.2] },
      { year: 2018, ages: [69.3] },
      { year: 2019, ages: [69.4] },
      { year: 2020, ages: [69.6] },
      { year: 2021, ages: [69.7] },
      { year: 2022, ages: [69.9] }
    ]
  },
  {
    country: "Lao",
    years: [
      { year: 2013, ages: [65] },
      { year: 2014, ages: [66] },
      { year: 2015, ages: [65] },
      { year: 2016, ages: [63] },
      { year: 2017, ages: [65] },
      { year: 2018, ages: [64] },
      { year: 2019, ages: [65] },
      { year: 2020, ages: [65] },
      { year: 2021, ages: [65] },
      { year: 2022, ages: [66] }
    ]
  },
  {
    country: "Malaysia",
    years: [
      { year: 2013, ages: [72.3] },
      { year: 2014, ages: [72.4] },
      { year: 2015, ages: [72.5] },
      { year: 2016, ages: [72.1] },
      { year: 2017, ages: [72.1] },
      { year: 2018, ages: [72.3] },
      { year: 2019, ages: [72.5] },
      { year: 2020, ages: [72.5] },
      { year: 2021, ages: [72.3] },
      { year: 2022, ages: [71.3] }
    ]
  },
  {
    country: "Myanmar",
    years: [
      { year: 2013, ages: [65.5] },
      { year: 2014, ages: [59.3] },
      { year: 2015, ages: [59.7] },
      { year: 2016, ages: [60.3] },
      { year: 2017, ages: [60.8] },
      { year: 2018, ages: [61.3] },
      { year: 2019, ages: [62] },
      { year: 2020, ages: [62] },
      { year: 2021, ages: [62.7] },
      { year: 2022, ages: [62.7] }
    ]
  },
  {
    country: "Phillipines",
    years: [
      { year: 2013, ages: [] },
      { year: 2014, ages: [] },
      { year: 2015, ages: [69.6] },
      { year: 2016, ages: [] },
      { year: 2017, ages: [] },
      { year: 2018, ages: [] },
      { year: 2019, ages: [] },
      { year: 2020, ages: [71.3] },
      { year: 2021, ages: [71.3] },
      { year: 2022, ages: [71.3] }
    ]
  },
  {
    country: "Singapore",
    years: [
      { year: 2013, ages: [80.1] },
      { year: 2014, ages: [80.3] },
      { year: 2015, ages: [80.5] },
      { year: 2016, ages: [80.7] },
      { year: 2017, ages: [80.9] },
      { year: 2018, ages: [81.2] },
      { year: 2019, ages: [81.4] },
      { year: 2020, ages: [81.3] },
      { year: 2021, ages: [80.8] },
      { year: 2022, ages: [80.7] }
    ]
  },
  {
    country: "Thailand",
    years: [
      { year: 2013, ages: [] },
      { year: 2014, ages: [] },
      { year: 2015, ages: [] },
      { year: 2016, ages: [71.2] },
      { year: 2017, ages: [71.8] },
      { year: 2018, ages: [72] },
      { year: 2019, ages: [71.9] },
      { year: 2020, ages: [72.4] },
      { year: 2021, ages: [73.5] },
      { year: 2022, ages: [73.6] }
    ]
  },
  {
    country: "Vietnam",
    years: [
      { year: 2013, ages: [70.5] },
      { year: 2014, ages: [70.6] },
      { year: 2015, ages: [70.7] },
      { year: 2016, ages: [70.8] },
      { year: 2017, ages: [70.9] },
      { year: 2018, ages: [70.9] },
      { year: 2019, ages: [71] },
      { year: 2020, ages: [71] },
      { year: 2021, ages: [71.1] },
      { year: 2022, ages: [71.1] }
    ]
  }
];



class RadialChart {
  constructor(containerId, data, width = 800, height = 600) {
    this.svg = document.getElementById(containerId);
    this.data = data;
    this.width = width;
    this.height = height;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.innerRadius = 110;
    this.outerRadius = Math.min(width, height) / 2 - 50;
    this.segmentAngle = (2 * Math.PI) / data.length;
    this.yearRadius = (this.outerRadius - this.innerRadius) / 10; // 10 years
    this.gapAngle = Math.PI / 180 * 5;
    this.tooltip = document.querySelector('.tooltip');

    this.init();
  }

  getColor(value) {
    if (!value) return '#eee';
    const minValue = 70;
    const maxValue = 82;
    const hue = ((value - minValue) / (maxValue - minValue)) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, outerRadius, endAngle);
    const end = this.polarToCartesian(x, y, outerRadius, startAngle);
    const innerStart = this.polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = this.polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "L", start.x, start.y
    ].join(" ");
  }

  createSegment(country, yearData, countryIndex, yearIndex) {
    if (yearData.ages.length === 0) return null;

    const value = yearData.ages[0];
    const startAngle = countryIndex * this.segmentAngle * 180 / Math.PI;
    const endAngle = (countryIndex + 1) * this.segmentAngle * 180 / Math.PI;
    const radius = this.innerRadius + yearIndex * this.yearRadius;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", this.describeArc(
      this.centerX,
      this.centerY,
      radius,
      radius + this.yearRadius - 2,
      startAngle,
      endAngle
    ));
    path.setAttribute("fill", this.getColor(value));
    path.setAttribute("opacity", "0.8");

    // Add event listeners
    path.addEventListener('mouseover', (e) => {
      path.setAttribute("opacity", "1");
      this.tooltip.style.opacity = "1";
      this.tooltip.innerHTML = `
                <strong>${country}</strong><br>
                ${yearData.year}: ${value} years
            `;
      this.tooltip.style.left = (e.pageX + 10) + 'px';
      this.tooltip.style.top = (e.pageY - 10) + 'px';
    });

    path.addEventListener('mousemove', (e) => {
      this.tooltip.style.left = (e.pageX + 10) + 'px';
      this.tooltip.style.top = (e.pageY - 10) + 'px';
    });

    path.addEventListener('mouseout', () => {
      path.setAttribute("opacity", "0.8");
      this.tooltip.style.opacity = "0";
    });

    return path;
  }

  createLabel(country, index) {
    const angle = index * this.segmentAngle + this.segmentAngle / 2;
    const radius = this.outerRadius + 45;
    const x = this.centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = this.centerY + radius * Math.sin(angle - Math.PI / 2);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "13");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("fill", "#333");
    text.textContent = country;

    return text;
  }

  createLegend() {
    // Create legend group inside the inner radius
    const legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const ranges = [
      { min: 50, max: 60, label: "Under 60 years" },
      { min: 61, max: 63, label: "61 - 63 Years" },
      { min: 64, max: 66, label: "64 - 66 Years" },
      { min: 67, max: 70, label: "67 - 70 Years" },
      { min: 71, max: 73, label: "71 - 73 Years" },
      { min: 74, max: 77, label: "74 - 77 Years" },
      { min: 78, max: 85, label: "78 Years and Over" }
    ];

    const offsetX = this.centerX - 80; // Offset for vertical alignment
    let offsetY = this.centerY - 100; // Start position for the first legend item

    // Create legend vertically
    ranges.forEach(range => {
      const legendItem = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const color = this.getColor((range.min + range.max) / 2); // Average value for color

      // Add colored block (rectangular)
      const colorBlock = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      colorBlock.setAttribute("x", 340);
      colorBlock.setAttribute("y", offsetY + 25);
      colorBlock.setAttribute("width", 16);
      colorBlock.setAttribute("height", 16);
      colorBlock.setAttribute("fill", color);
      legendItem.appendChild(colorBlock);

      // Add label text
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", offsetX + 40); // Positioned next to the block
      text.setAttribute("y", offsetY + 35); // Vertically aligned with the block
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", "#333");
      text.textContent = range.label;
      legendItem.appendChild(text);

      legendGroup.appendChild(legendItem);

      // Update vertical position for the next legend item
      offsetY += 22;
    });

    this.svg.appendChild(legendGroup);
  }

  init() {
    // Clear existing content
    this.svg.innerHTML = '';

    // Add background circle
    const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    background.setAttribute("cx", this.centerX);
    background.setAttribute("cy", this.centerY);
    background.setAttribute("r", this.outerRadius);
    background.setAttribute("fill", "#f8f8f8");
    this.svg.appendChild(background);

    // Create segments
    this.data.forEach((country, countryIndex) => {
      country.years.forEach((yearData, yearIndex) => {
        const segment = this.createSegment(country.country, yearData, countryIndex, yearIndex);
        if (segment) {
          this.svg.appendChild(segment);
        }
      });

      // Add country label
      const label = this.createLabel(country.country, countryIndex);
      this.svg.appendChild(label);
    });

    // Create center circle
    const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute("cx", this.centerX);
    centerCircle.setAttribute("cy", this.centerY);
    centerCircle.setAttribute("r", this.innerRadius);
    centerCircle.setAttribute("fill", "white");
    centerCircle.setAttribute("stroke", "#ccc");
    this.svg.appendChild(centerCircle);

    // Create legend inside the inner radius
    this.createLegend();
  }
}

// Initialize the chart
const chart = new RadialChart('LFM', data);

var RadarChart = {
  draw: function (id, d, options) {
    var cfg = {
      radius: 5,
      w: 600,
      h: 600,
      factor: 1,
      factorLegend: .85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: d3.scale.category10()
    };

    if ('undefined' !== typeof options) {
      for (var i in options) {
        if ('undefined' !== typeof options[i]) {
          cfg[i] = options[i];
        }
      }
    }
    cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));
    var allAxis = (d[0].map(function (i, j) { return i.axis }));
    var total = allAxis.length;
    var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
    var Format = d3.format('%');
    d3.select(id).select("svg").remove();

    var g = d3.select(id)
      .append("svg")
      .attr("width", cfg.w + cfg.ExtraWidthX)
      .attr("height", cfg.h + cfg.ExtraWidthY)
      .append("g")
      .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
    ;

    var tooltip;

    //Circular segments
    for (var j = 0; j < cfg.levels - 1; j++) {
      var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
        .data(allAxis)
        .enter()
        .append("svg:line")
        .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
        .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
        .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
        .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px")
        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
    }

    //Text indicating at what % each level is
    for (var j = 0; j < cfg.levels; j++) {
      var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
        .data([1]) //dummy data
        .enter()
        .append("svg:text")
        .attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
        .attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
        .attr("class", "legend")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
        .attr("fill", "#737373")
        .text(Format((j + 1) * cfg.maxValue / cfg.levels));
    }

    series = 0;

    var axis = g.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", cfg.w / 2)
      .attr("y1", cfg.h / 2)
      .attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
      .attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    axis.append("text")
      .attr("class", "legend")
      .text(function (d) { return d })
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function (d, i) { return "translate(0, -10)" })
      .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
      .attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


    d.forEach(function (y, x) {
      dataValues = [];
      g.selectAll(".nodes")
        .data(y, function (j, i) {
          dataValues.push([
            cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
          ]);
        });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("class", "radar-chart-serie" + series)
        .style("stroke-width", "2px")
        .style("stroke", cfg.color(series))
        .attr("points", function (d) {
          var str = "";
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        })
        .style("fill", function (j, i) { return cfg.color(series) })
        .style("fill-opacity", cfg.opacityArea)
        .on('mouseover', function (d) {
          z = "polygon." + d3.select(this).attr("class");
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", 0.1);
          g.selectAll(z)
            .transition(200)
            .style("fill-opacity", .7);
        })
        .on('mouseout', function () {
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        });
      series++;
    });
    series = 0;


    d.forEach(function (y, x) {
      g.selectAll(".nodes")
        .data(y).enter()
        .append("svg:circle")
        .attr("class", "radar-chart-serie" + series)
        .attr('r', cfg.radius)
        .attr("alt", function (j) { return Math.max(j.value, 0) })
        .attr("cx", function (j, i) {
          dataValues.push([
            cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
          ]);
          return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
        })
        .attr("cy", function (j, i) {
          return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
        })
        .attr("data-id", function (j) { return j.axis })
        .style("fill", cfg.color(series)).style("fill-opacity", .9)
        .on('mouseover', function (d) {
          newX = parseFloat(d3.select(this).attr('cx')) - 10;
          newY = parseFloat(d3.select(this).attr('cy')) - 5;

          tooltip
            .attr('x', newX)
            .attr('y', newY)
            .text(Format(d.value))
            .transition(200)
            .style('opacity', 1);

          z = "polygon." + d3.select(this).attr("class");
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", 0.1);
          g.selectAll(z)
            .transition(200)
            .style("fill-opacity", .7);
        })
        .on('mouseout', function () {
          tooltip
            .transition(200)
            .style('opacity', 0);
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        })
        .append("svg:title")
        .text(function (j) { return Math.max(j.value, 0) });

      series++;
    });
    //Tooltip
    tooltip = g.append('text')
      .style('opacity', 0)
      .style('font-family', 'sans-serif')
      .style('font-size', '13px');
  }
};