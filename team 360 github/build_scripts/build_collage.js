const fs = require('fs');
const files = fs.readdirSync('Team 360 fav pic').sort();

let html = `<!-- Fully unified collage grid container -->
<div class="portfolio-collage-grid residential-grid">\n`;

for (let i = 0; i < 3; i++) {
  html += `  <!-- Visible Collage Tiles (Compact, small-to-mid sizes) -->
  <div class="portfolio-item-container collage-tile">
    <img src="team 360 fav pic/${files[i]}" alt="Luxury Detail" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
  </div>\n`;
}

html += `
  <!-- Hidden Dropdown Collage Content (Injected directly into the same grid flow when active) -->
  <div class="portfolio-hidden-wrapper" style="display: none;">\n`;

for (let i = 3; i < files.length; i++) {
  html += `    <div class="portfolio-item-container collage-tile">
      <img src="team 360 fav pic/${files[i]}" alt="Luxury Detail" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
    </div>\n`;
}

html += `  </div>
</div>

<div class="portfolio-action-wrapper" style="text-align: center; margin-top: 30px; width: 100%;">
  <button class="see-more-btn portfolio-toggle-trigger" style="background: transparent; color: var(--color-text); padding: 1rem 3rem; border: 1px solid var(--border-subtle); cursor: pointer; text-transform: uppercase; letter-spacing: 0.15em;">See More</button>
</div>`;

fs.writeFileSync('residential-collage.txt', html);

let indexHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '      <div class="portfolio-grid residential-grid">';
const startMarker2 = '<div class="portfolio-grid residential-grid">';
const endMarker = '<!-- Commercial Sub-category -->';

let startIndex = indexHtml.indexOf(startMarker);
if(startIndex === -1) startIndex = indexHtml.indexOf(startMarker2);

const endIndex = indexHtml.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const newHtml = indexHtml.substring(0, startIndex) + html + '\n    </div>\n  </div>\n\n  ' + indexHtml.substring(endIndex);

fs.writeFileSync('index.html', newHtml);
console.log("Replaced successfully!");
