import os
files = sorted(os.listdir('Team 360 fav pic'))
html = '''      <!-- Visible Residential Grid Items -->
      <div class="portfolio-grid residential-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        <div class="portfolio-item">
          <img src="team 360 fav pic/'''+files[0]+'''" alt="Luxury Architectural Detail" class="portfolio-img" onerror="this.src='team-360-fav-pic/'''+files[0]+''''">
        </div>
        <div class="portfolio-item">
          <img src="team 360 fav pic/'''+files[1]+'''" alt="Premium Living Space" class="portfolio-img" onerror="this.src='team-360-fav-pic/'''+files[1]+''''">
        </div>
        <div class="portfolio-item">
          <img src="team 360 fav pic/'''+files[2]+'''" alt="Bespoke Residential Interior" class="portfolio-img" onerror="this.src='team-360-fav-pic/'''+files[2]+''''">
        </div>

        <!-- Collapsible Hidden Dropdown Grid for Remaining Photos -->
        <div class="portfolio-dropdown-content" style="display: none; width: 100%; grid-column: 1 / -1;">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding-top: 20px;">
'''
for f in files[3:]:
    html += f'''            <div class="portfolio-item">
              <img src="team 360 fav pic/{f}" alt="Bespoke Detail" class="portfolio-img" onerror="this.src='team-360-fav-pic/{f}'">
            </div>\n'''
html += '''          </div>
        </div>
      </div>

      <!-- Accessible View More Trigger Link -->
      <div class="portfolio-action-wrapper" style="text-align: center; margin-top: 30px;">
        <button class="see-more-btn portfolio-toggle-trigger" style="background: transparent; color: var(--color-text); padding: 1rem 3rem; border: 1px solid var(--border-subtle); cursor: pointer; text-transform: uppercase; letter-spacing: 0.15em;">See More</button>
      </div>'''

with open('residential-grid.txt', 'w', encoding='utf-8') as f:
    f.write(html)
