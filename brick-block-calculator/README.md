# Wall Material Estimator

A responsive web application for calculating wall materials including bricks/blocks, sand, and cement needed for construction projects. Built with HTML, CSS (Tailwind), and JavaScript.

## Features

- **Brick/Block Calculations**: Switch between brick and block calculations with automatic ratio adjustments
- **Wall Thickness Options**: Single wall and double wall configurations
- **Material Ratios**: Customizable ratios for sand, cement, bricks, and blocks per square meter
- **Multiple Wall Sections**: Add unlimited wall sections with individual calculations
- **Opening Deductions**: Account for windows, doors, and other openings
- **Final Quantities**: Calculate final materials needed including:
  - Total bricks/blocks (with pack calculations)
  - Sand requirements (kg and bulk bags)
  - Cement requirements (kg and bags)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Calculations**: Automatic updates as you input dimensions

## How to Use

1. **Select Calculation Type**: Choose between Bricks or Blocks
2. **Choose Wall Thickness**: Select Single Wall or Double Wall
3. **Adjust Material Ratios**: Modify the default ratios if needed (sand, cement, units per m²)
4. **Add Wall Sections**: Click "Add Wall Section" to add new walls
5. **Enter Dimensions**: Input length and height for each wall section
6. **Deduct Openings**: Enter total area of openings to be deducted
7. **View Results**: See calculated totals and final quantities needed

## Material Ratios (Default Values)

### Bricks
- **Single Wall**: 30 kg sand/m², 7.5 kg cement/m², 60 bricks/m²
- **Double Wall**: 60 kg sand/m², 15 kg cement/m², 120 bricks/m²

### Blocks
- **Single Wall**: 18 kg sand/m², 4.5 kg cement/m², 10 blocks/m²
- **Double Wall**: 36 kg sand/m², 9 kg cement/m², 20 blocks/m²

## Calculations

- **Wall Area**: Length × Height for each section
- **Material Quantities**: Based on area × material ratios
- **Opening Deductions**: Total area minus opening areas
- **Final Quantities**: 
  - Bricks/Blocks: Rounded up to nearest whole number
  - Packs: Based on 500 units per pack
  - Sand: Rounded up to nearest kg, bulk bags based on 600 kg
  - Cement: Rounded up to nearest kg, bags based on 25 kg

## Mobile Features

- **Responsive Tables**: Tables stack vertically on mobile devices
- **Touch-Friendly**: Large buttons and inputs for easy mobile use
- **Data Labels**: Clear labels for each field on mobile view
- **Optimized Layout**: Single-column layout for small screens

## Setup

1. Clone or download the project files
2. Open `index.html` in a web browser
3. No additional dependencies required (uses CDN for Tailwind CSS and Font Awesome)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Mobile Testing

The application is fully responsive and can be tested on mobile devices by:
1. Running a local server: `python3 -m http.server 8000`
2. Accessing via your computer's IP address: `http://[YOUR_IP]:8000/brick-block-calculator/`

## Development

- **HTML**: Structure and layout
- **CSS**: Styling with Tailwind CSS framework and custom styles
- **JavaScript**: Calculation logic and interactivity (embedded in HTML)

## License

This project is developed for Calidwell Homes internal use. 