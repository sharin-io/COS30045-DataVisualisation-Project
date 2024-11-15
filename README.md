# Data Visualization Project (COS30045)

## Project Overview

This repository contains the group project for the Data Visualization course (COS30045). Our team is developing an interactive data visualization using D3.js, focusing on health statistics from the OECD database and other related sources, particularly for ASEAN countries. The project aims to create a compelling narrative around the health trends in ASEAN countries, including life expectancy, population demographics, and related indicators.

### Purpose

The purpose of this project is to demonstrate our team's ability to develop an interactive data visualization that effectively communicates insights from health-related data. We aim to explore trends in life expectancy, birth rates, and population demographics across ASEAN countries, and highlight future implications of these trends. 

The project will integrate various data sources, leveraging D3.js to provide an engaging, user-friendly experience that informs policy decisions and research in the healthcare domain.

### Target Audience

Our target audience includes:
- **Policymakers**: To help guide healthcare investments and policy decisions.
- **Researchers**: To assist with demographic studies and healthcare trend analysis.
- **General Public**: To increase awareness about health trends in ASEAN countries.

## Data Sources

### Primary Dataset
- [OECD Health Statistics](https://www.oecd-ilibrary.org/social-issues-migration-health/data/oecd-health-statistics_health-data-en): Contains comprehensive health data, including life expectancy, healthcare access, and demographic statistics.

### Additional Datasets
- [Statista: Life Expectancy in ASEAN Countries](https://www.statista.com/statistics/life-expectancy-asean/)
- [Macrotrends: Life Expectancy in ASEAN Countries](https://www.macrotrends.net/countries/ASEAN/life-expectancy)
- [World Bank: Life Expectancy at Birth, Total (Years) - ASEAN](https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=ASEAN)
- [ASEAN Data: Population and Demographics](https://aseanstats.asean.org)

## Key Findings and Insights

### Storytelling Approach
1. **Guided Narrative Flow**: The visualization starts with an introduction to ASEAN health trends, followed by specific insights into life expectancy, birth rates, and population growth.
2. **Context-Rich Explanations**: We provide clear explanations and contextualize the data to highlight the significance of the trends observed.
3. **Progressive Disclosure of Information**: Key insights, such as future health trends and implications for healthcare infrastructure, are revealed progressively to maintain user engagement.
4. **Highlight Key Findings**: The visualization emphasizes demographic shifts, such as the aging populations in countries like Thailand and Vietnam, and the impact of urbanization on healthcare accessibility.

## Technical Implementation Considerations

- **Modular Component Structure**: The code is structured to ensure modularity, making it easy to extend and maintain.
- **Clean, Maintainable Code**: We prioritize readability and organization in our code to ensure that it is maintainable and scalable.
- **Responsive Design Principles**: The visualization is responsive, ensuring that it adjusts to different screen sizes and devices.
- **Performance Optimization**: We optimize the rendering of large datasets by employing D3.js techniques for efficient data binding and updating the DOM only when necessary.

## File Structure

```
├── index.html            # Main HTML file with the structure of the webpage
├── html/                 # Folder for additional HTML files
│   └── other_pages.html  # Example of additional HTML pages (e.g., about.html, contact.html)
├── script/               # JavaScript files for interactivity and data visualization
│   └── other_files.js    # Main JS file and other JavaScript files for rendering visualizations
├── data/                 # Data files in CSV and JSON format for use in visualizations
│   └── CSV files         # Collection of all CSV files for various visualizations (e.g., life expectancy data)
├── style/                # CSS files for styling the project
│   └── main.css          # Main CSS file and additional CSS files
└── README.md             # Project documentation, explaining project structure, technologies used, etc.

```


## Technologies Used

- **D3.js**: For dynamic and interactive data visualization.
- **HTML/CSS**: For webpage structure and styling, ensuring a clean and user-friendly layout.
- **JavaScript**: For interactive elements, data manipulation, and rendering visualizations.
- **GitHub**: For version control, collaboration, and project management.
- **OneDrive**: For storing documents, resources, and the project process book.

## Development Process

We followed an iterative development process, focusing on key milestones:
1. **Initial Setup**: Establishing the data sources and layout structure.
2. **Data Visualization Development**: Building D3.js visualizations for health metrics.
3. **Interactivity**: Adding features like tooltips, hover effects, and click interactions for deeper insights.
4. **Testing & Optimization**: Ensuring the visualization performs well across devices and with large datasets.

## User Experience Focus

- **Intuitive Navigation**: The design follows a simple and intuitive flow, guiding the user through key insights.
- **Clear Visual Hierarchy**: The visual hierarchy highlights the most important information, such as life expectancy trends and future implications.
- **Consistent Design Language**: Consistent use of colors, typography, and icons ensures a cohesive and professional design.
- **Thoughtful Color Scheme**: A color scheme that balances aesthetics with readability is used throughout the project, adhering to best practices in data visualization.

## Team Members

- SHIN THANT THI RI ([@sharin-io](https://github.com/sharin-io))
- YADANAR THEINT ([@Treasure-Mei-box](https://github.com/Treasure-Mei-box))

## Contributing

To contribute, team members should follow these steps:
1. Create a new branch for each feature or bug fix.
2. Make changes and commit them with descriptive messages.
3. Open a pull request for review.
4. After approval, merge the changes into the main branch.

## Additional Resources

- [D3.js Documentation](https://d3js.org/)
- [OECD Health Statistics](https://www.oecd-ilibrary.org/social-issues-migration-health/data/oecd-health-statistics_health-data-en)
- [Statista: Life Expectancy in ASEAN Countries](https://www.statista.com/statistics/life-expectancy-asean/)
- [Macrotrends: Life Expectancy in ASEAN Countries](https://www.macrotrends.net/countries/ASEAN/life-expectancy)
- [World Bank: Life Expectancy at Birth, Total (Years) - ASEAN](https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=ASEAN)

---
