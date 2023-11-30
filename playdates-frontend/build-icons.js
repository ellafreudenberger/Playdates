//Generating React components for SVG files 

const { sync: svgrSync } = require('@svgr/core');
const fs = require('fs');
const path = require('path');

const iconsDir = path.resolve(__dirname, 'src/icons');
const outputDir = path.resolve(__dirname, 'src/icons');

const files = fs.readdirSync(iconsDir);

files.forEach(async (file) => {
  if (file.endsWith('.svg')) {
    const filePath = path.resolve(iconsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const result = svgrSync(fileContent, { icon: true });
    const outputFileName = file.replace(/\.svg$/, '.js');
    const outputPath = path.resolve(outputDir, outputFileName);
    fs.writeFileSync(outputPath, result);
  }
});
