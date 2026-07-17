const fs = require('fs');
const files = fs.readdirSync('Team 360 fav pic').sort();

let html = `<!-- Fully unified collage grid containers -->
<div class="portfolio-collage-grid residential-grid">\n`;

for (let i = 0; i < 4; i++) {
  html += `  <div class="collage-tile">
    <img src="team 360 fav pic/${files[i]}" alt="Luxury Detail" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
  </div>\n`;
}

html += `</div>

<!-- Hidden Dropdown Collage Content -->
<div class="portfolio-hidden-wrapper" style="display: none;">\n`;

for (let i = 4; i < files.length; i++) {
  html += `  <div class="collage-tile">
    <img src="team 360 fav pic/${files[i]}" alt="Luxury Detail" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
  </div>\n`;
}

html += `</div>

<div class="portfolio-action-wrapper" style="text-align: center; margin-top: 30px; width: 100%;">
  <button class="see-more-btn portfolio-toggle-trigger" style="background: transparent; color: var(--color-text); padding: 1rem 3rem; border: 1px solid var(--border-subtle); cursor: pointer; text-transform: uppercase; letter-spacing: 0.15em;">See More</button>
</div>`;

fs.writeFileSync('residential-collage-4.txt', html);

let indexHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Fully unified collage grid containers -->';
const endMarker = '<!-- Commercial Sub-category -->';

let startIndex = indexHtml.indexOf(startMarker);
let endIndex = indexHtml.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const newHtml = indexHtml.substring(0, startIndex) + html + '\n    </div>\n  </div>\n\n  ' + indexHtml.substring(endIndex);

fs.writeFileSync('index.html', newHtml);
console.log("Replaced successfully!");
