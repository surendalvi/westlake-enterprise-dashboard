# Westlake Corporation - Process Efficiency & Asset Metric Hub (AMH)
### Next-Gen Digital Solution Deployment Guide
**Powered by Ingenero Physics-Informed Hybrid AI Engine**

---

## 🚀 Quick Start Deployment Options

### Option 1: 1-Click Windows Launch (Recommended for Pitching)
Simply double-click **`start.bat`** in the project directory.
- Starts the lightweight Python HTTP Server on port `8080`.
- Automatically opens your default web browser to `http://localhost:8080`.

### Option 2: Linux / Mac 1-Click Launch
Run the shell script in terminal:
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Python Built-In Server (Manual)
Run the python server script:
```bash
python server.py
```
Open **`http://localhost:8080`** in Google Chrome, Microsoft Edge, or Safari.

### Option 4: Docker Container Deployment (Production Hosting)
Build and run the lightweight Nginx Alpine container:
```bash
# Build & Launch with Docker Compose
docker-compose up -d --build
```
Access the application at `http://localhost:8080` or host on port 80/443 on your cloud server (AWS, Azure, GCP, DigitalOcean).

### Option 5: Static Web Hosting (Vercel / Netlify / AWS S3 / Nginx)
Since the application is built with vanilla HTML5, CSS3, vanilla ES6 Javascript, and Chart.js CDN, you can directly upload the project files (`index.html`, `styles.css`, `data.js`, `app.js`) to any static web host or S3 bucket + CloudFront distribution!

---

## ⚡ Core Platform Capabilities

1. **Enterprise Opportunity Summary**:
   - Total Realizable Opportunity: **$5.24 MM / year** ($0.01435 MM / day).
   - Module 1 (Process Hub): **$3.12 MM / year**.
   - Module 2 (AMH Asset Hub): **$2.12 MM / year**.
2. **Ingenero Physics-Informed AI/ML Model Suite**:
   - Mechanistic Kinetic Severity Model (`PINN - 99.4% Accuracy`)
   - Virtual Effluent Soft Sensors (`98.9% Accuracy`, 0-sec delay vs 20-min GC lab)
   - CPR Decoke Termination Predictor (`99.1% Accuracy`, zero CO/CO2 dependence)
   - Thermal-Creep & Lifetime Predictor (`97.6% Accuracy`)
   - SAP Maintenance NLP Text Classifier (`96.8% Accuracy`)
3. **Interactive Ethylene Furnace Schematic Infographic**:
   - Visual 2D SVG diagram with hoverable TMT pass sensor nodes (P1–P8).
   - Real-time P4 hot-spot alert (1045°C) and valve trimming advice.
4. **Solomon 4-Quadrant Benchmarking Engine**:
   - Site color-segregated scatter plot mapping all 24 furnaces against 1st-quartile baselines.
5. **AI Diagnostic Assistant with API Key & Fallback Engine**:
   - Custom Gemini (`AIza...`) or OpenAI (`sk-...`) key option stored in `localStorage`.
   - Automatic multi-model fallback loop (`gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-pro`).
   - Ingenero Plant Domain NLP Engine for answering any fleet telemetry query without key.
6. **Dual Theme (Dark Glassmorphism / Ingenero Light Mode)**:
   - Header toggle switch transitioning between Dark Mode and Light Mode (`#f8fafc`).
