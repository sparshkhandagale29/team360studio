const fs = require('fs');
const files = fs.readdirSync('Team 360 fav pic').sort();

let html = `      <!-- Visible Residential Grid Items -->
      <div class="portfolio-grid residential-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; width: 100%; align-items: start;">\n`;

for (let i = 0; i < 3; i++) {
  html += `        <div class="portfolio-item-container">
          <img src="team 360 fav pic/${files[i]}" alt="Luxury Interior" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
        </div>\n`;
}

html += `      </div>

      <!-- Inline Hidden Content Wrapper -->
      <div class="portfolio-hidden-wrapper" style="display: none; width: 100%; margin-top: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; width: 100%; align-items: start;">\n`;

for (let i = 3; i < files.length; i++) {
  html += `          <div class="portfolio-item-container">
            <img src="team 360 fav pic/${files[i]}" alt="Luxury Interior" class="portfolio-img-uncropped" data-fullsrc="team 360 fav pic/${files[i]}">
          </div>\n`;
}

html += `        </div>
      </div>

      <div class="portfolio-action-wrapper" style="text-align: center; margin-top: 30px; width: 100%;">
        <button class="see-more-btn portfolio-toggle-trigger" style="background: transparent; color: var(--color-text); padding: 1rem 3rem; border: 1px solid var(--border-subtle); cursor: pointer; text-transform: uppercase; letter-spacing: 0.15em;">See More</button>
      </div>`;

fs.writeFileSync('residential-grid-lightbox.txt', html);
