<div align="center">

![License](https://img.shields.io/github/license/dovvnloading/Baked-Metric?style=for-the-badge&color=57534E)
![Build Status](https://img.shields.io/github/actions/workflow/status/dovvnloading/Baked-Metric/deploy.yml?branch=main&style=for-the-badge&label=Deployment)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

# Baked-Metric

<a href="https://dovvnloading.github.io/Baked-Metric/">
  <img width="1247" height="842" alt="Baked-Metric Application Interface" src="https://github.com/user-attachments/assets/47b104d0-08ad-418a-ba98-a4c5478b1a07" />
</a>

<br />

### [Launch Application](https://dovvnloading.github.io/Baked-Metric/)

</div>

## Kitchen Chemistry

Baking is not an art; it is chemistry. While generic conversion tools treat every ingredient like water, **Baked-Metric** respects the physics of the kitchen.

Most recipes fail not because of technique, but because of imprecise translation. A cup of flour weighs significantly less than a cup of sugar, and 350°F behaves differently at sea level than it does in Denver. This application bridges the gap between recipe intent and environmental reality.

Built with a soft-UI design system, it feels as natural and tactile as the ingredients themselves.

## Core Utilities

### 1. Density-Aware Conversion
Standard volume-to-weight converters are often inaccurate because they ignore specific gravity. Baked-Metric utilizes a database of over 50 specific ingredient densities.
*   **Context:** 1 Cup of All-Purpose Flour (≈125g) ≠ 1 Cup of Sugar (≈200g).
*   **Solution:** Select specific ingredients to derive exact gram weights from volumetric measurements.

### 2. High-Altitude Thermodynamics
Air pressure drops as elevation rises, causing water to boil at lower temperatures and leavening gases to expand more rapidly.
*   **Context:** Baking a cake at 5,000ft using sea-level instructions often results in structural collapse.
*   **Solution:** An integrated slider calculates the necessary oven temperature offsets and gas mark adjustments based on your current elevation.

### 3. Pan Geometry Scaling
Changing bakeware requires more than guesswork. A recipe designed for a 9-inch round pan cannot simply be poured into an 8-inch square pan without altering the bake time or depth.
*   **Context:** Surface area dictates evaporation rates and heat distribution.
*   **Solution:** Mathematically compares the surface area (or volume for Bundts) of source and target pans to generate a precise scaling ratio (e.g., "Multiply all ingredients by 1.23x").

## Technical Architecture

This project serves as a modern reference implementation for React 19 and strict TypeScript integration. It demonstrates how to build complex, state-driven interfaces without relying on heavy UI component libraries.

*   **Framework:** React 19 (Hooks, Functional Components)
*   **Language:** TypeScript (Strict Mode)
*   **Build Tool:** Vite
*   **Styling:** TailwindCSS with a custom Neumorphic/Claymorphic design system
*   **Deployment:** GitHub Actions (CI/CD) to GitHub Pages

## Local Development

This project uses standard Node.js tooling. Ensure you have Node.js (v18+) installed.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/dovvnloading/Baked-Metric.git
    cd Baked-Metric
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## License

This project is open-source and available under the MIT License. You are free to copy, modify, and distribute this software for educational or commercial purposes.
