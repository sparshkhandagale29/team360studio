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
Write-Output $newHtml
