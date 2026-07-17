const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Visible Residential Grid Items -->';
const endMarker = '<!-- Commercial Sub-category -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const replacement = fs.readFileSync('residential-grid-lightbox.txt', 'utf8');

// The replacement will replace everything from startMarker up to just before endMarker.
// Note: need to preserve indentation for <!-- Commercial Sub-category -->
const newHtml = html.substring(0, startIndex) + replacement + '\n    </div>\n  </div>\n\n  ' + html.substring(endIndex);

fs.writeFileSync('index.html', newHtml);
console.log("Replaced successfully!");
