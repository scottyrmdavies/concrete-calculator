# Calidwell Homes Construction Calculators

A collection of professional web-based calculators for construction projects, built with HTML, CSS (Tailwind), and JavaScript. All calculators feature responsive design and Calidwell Homes branding.

## 📱 Available Calculators

### 1. Material Quantity Calculator (`calculator.html`)
**Purpose**: Calculate excavation volumes, material weights, and disposal quantities for construction projects.

**Features**:
- Multiple material types (Concrete, Clay, Soil, Rock/Bricks, Sand/Gravel)
- Bulking factor calculations for excavated materials
- Real-time volume and weight calculations
- Project summaries with totals
- Mobile-responsive design

**Access**: Open `calculator.html` in your browser

### 2. Wall Material Estimator (`brick-block-calculator/`)
**Purpose**: Calculate bricks/blocks, sand, and cement needed for wall construction.

**Features**:
- Brick and block calculations with automatic ratio adjustments
- Single and double wall thickness options
- Customizable material ratios
- Opening deductions for windows and doors
- Final quantities with pack and bag calculations
- Mobile-responsive design

**Access**: Open `brick-block-calculator/index.html` in your browser

## 🚀 Quick Start

### Local Development
1. **Clone or download** this repository
2. **Start a local server**:
   ```bash
   python3 -m http.server 8000
   ```
3. **Access the calculators**:
   - Material Calculator: `http://localhost:8000/calculator.html`
   - Wall Estimator: `http://localhost:8000/brick-block-calculator/`

### Mobile Testing
- **Find your computer's IP address** (usually starts with 192.168.x.x)
- **Access from your phone**: `http://[YOUR_IP]:8000/calculator.html`

## 🎨 Design Features

- **Calidwell Homes Branding**: Consistent color scheme and styling
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Touch-Friendly**: Optimized for on-site mobile use
- **Real-time Calculations**: Instant updates as you input data
- **Professional UI**: Clean, modern interface

## 🛠️ Technology Stack

- **HTML5**: Structure and semantics
- **CSS3**: Styling with Tailwind CSS framework
- **JavaScript**: Interactive calculations and functionality
- **Font Awesome**: Icons for better UX

## 📁 Project Structure

```
calidwellcal/
├── calculator.html              # Material Quantity Calculator
├── brick-block-calculator/
│   ├── index.html              # Wall Material Estimator
│   └── README.md               # Detailed documentation
├── README.md                   # This file
└── .gitignore                 # Git ignore rules
```

## 🔧 Customization

### Adding New Materials
Edit the material properties in the respective calculator files:
- `calculator.html`: Update `materialProperties` object
- `brick-block-calculator/index.html`: Update ratios and calculations

### Branding Changes
Modify the CSS variables in the `:root` selector:
```css
:root {
    --calidwell-primary-accent: #30C7B5;
    --calidwell-secondary-accent: #00AC97;
    --calidwell-dark-text: #14261C;
    /* ... other colors */
}
```

## 📱 Mobile Features

- **Responsive Tables**: Stack vertically on mobile devices
- **Touch-Friendly Inputs**: Large, easy-to-tap form elements
- **Optimized Layout**: Single-column design for small screens
- **Data Labels**: Clear labels for each field on mobile view

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is developed for Calidwell Homes internal use.

## 🤝 Contributing

For internal development and improvements to the calculators.

---

**Built for Calidwell Homes Construction Projects** 🏗️ 