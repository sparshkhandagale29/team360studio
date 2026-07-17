const fs = require('fs');
const files = fs.readdirSync('Team 360 fav pic').sort();

let html = `      <!-- Visible Residential Grid Items -->
      <div class="portfolio-grid residential-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; width: 100%;">
`;

for (let i = 0; i < 3; i++) {
  html += `        <div class="portfolio-item">
          <img src="team 360 fav pic/${files[i]}" alt="Luxury Interior" class="portfolio-img-fixed">
        </div>\n`;
}

html += `      </div>

      <!-- Inline Content Injection container right below the primary grid -->
      <div class="portfolio-hidden-wrapper" style="display: none; width: 100%; margin-top: 16px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; width: 100%;">\n`;

for(let i = 3; i < files.length; i++) {
  html += `          <div class="portfolio-item">
            <img src="team 360 fav pic/${files[i]}" alt="Luxury Interior" class="portfolio-img-fixed">
          </div>\n`;
}

html += `        </div>
      </div>

      <div class="portfolio-action-wrapper" style="text-align: center; margin-top: 30px; width: 100%;">
        <button class="see-more-btn portfolio-toggle-trigger" style="background: transparent; color: var(--color-text); padding: 1rem 3rem; border: 1px solid var(--border-subtle); cursor: pointer; text-transform: uppercase; letter-spacing: 0.15em;">See More</button>
      </div>`;

fs.writeFileSync('residential-grid-fixed.txt', html);
