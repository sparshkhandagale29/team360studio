$htmlPath = "index.html"
$content = Get-Content $htmlPath -Raw

$folder = "Team 360 fav pic\Hospitality"
$files = Get-ChildItem -Path $folder -File -Filter "*.jpeg" | Sort-Object Name

$newHtml = ""
foreach ($file in $files) {
    $filename = $file.Name
    $src = "Team 360 fav pic/Hospitality/$filename"
    $newHtml += "              <div class=`"commercial-item`">`r`n"
    $newHtml += "                  <img src=`"$src`" loading=`"lazy`" decoding=`"async`" alt=`"Hospitality`" class=`"portfolio-img-uncropped`" data-fullsrc=`"$src`">`r`n"
    $newHtml += "              </div>`r`n"
}

# Regex to replace everything inside the hospitality-track div
$pattern = '(<div class="commercial-spread commercial-scroll-track commercial-track hospitality-track">)([\s\S]*?)(          </div>\r?\n      </div>)'
$replacement = "`$1`r`n$newHtml`$3"

$newContent = [regex]::Replace($content, $pattern, $replacement)
Set-Content -Path $htmlPath -Value $newContent -Encoding UTF8

Write-Host "Updated index.html with $($files.Count) images."
