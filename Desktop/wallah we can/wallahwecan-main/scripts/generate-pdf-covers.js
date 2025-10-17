const fs = require('fs');
const path = require('path');

// List of PDF files from the glass-folder-grid component
const pdfFiles = [
    "statuts fondateurs pv statuts amendés",
    "patente code douane rne exoneration impot", 
    "JORT & declaration d'existence",
    "narratifs et états financiers 2013 - 2019",
    "narratifs, etats financiers et audits 2020 - 2022",
    "domiciliation & CNSS",
    "onvs min Education 2014 & 2023",
    "Publication des dons de l'ambassade des Pays-Bas",
    "Etats financiers et audit 2023",
    "Rapport narratif 2022",
    "Rapport narratif 2023",
    "Attestation de situation fiscal",
    "Publication des dons étrangers 2021-2023",
    "Organigramme de WallahWeCan Global"
];

// Create placeholder SVG for each PDF
const createPlaceholderSVG = (title) => {
    const shortTitle = title.length > 30 ? title.substring(0, 27) + "..." : title;
    return `<svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="280" fill="#f97316"/>
<rect x="10" y="10" width="180" height="260" fill="#ffffff" opacity="0.9"/>
<text x="100" y="50" fill="#1f2937" font-size="12" font-family="Arial" text-anchor="middle" font-weight="bold">WALLAH WE CAN</text>
<text x="100" y="140" fill="#374151" font-size="10" font-family="Arial" text-anchor="middle">${shortTitle}</text>
<rect x="20" y="180" width="160" height="2" fill="#f97316"/>
<text x="100" y="220" fill="#6b7280" font-size="8" font-family="Arial" text-anchor="middle">Document PDF</text>
</svg>`;
};

// Ensure the covers directory exists
const coversDir = path.join(__dirname, '..', 'public', 'images', 'pdf-covers');
if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
}

// Generate covers for each PDF
pdfFiles.forEach(filename => {
    const svgContent = createPlaceholderSVG(filename);
    
    // Create both .jpg and .png versions
    const jpgPath = path.join(coversDir, `${filename}.jpg`);
    const pngPath = path.join(coversDir, `${filename}.png`);
    
    // For now, save as SVG files (browsers will handle them as images)
    fs.writeFileSync(jpgPath.replace('.jpg', '.svg'), svgContent);
    fs.writeFileSync(pngPath.replace('.png', '.svg'), svgContent);
    
    console.log(`Generated cover for: ${filename}`);
});

console.log('All PDF covers generated successfully!');
