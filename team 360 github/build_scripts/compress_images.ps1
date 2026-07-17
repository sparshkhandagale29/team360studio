Add-Type -AssemblyName System.Drawing

$allowedExtensions = @('.jpg', '.jpeg', '.png')
$files = Get-ChildItem -Path "Team 360 fav pic", "images" -Recurse -ErrorAction SilentlyContinue | Where-Object { $allowedExtensions -contains $_.Extension.ToLower() }

foreach ($file in $files) {
    if ($file.Length -gt 1MB) {
        Write-Host "Compressing $($file.FullName) ($([math]::Round($file.Length / 1MB, 2)) MB)..."
        try {
            # Load the image into a MemoryStream to prevent file locking
            $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
            $ms = New-Object System.IO.MemoryStream(,$bytes)
            $img = [System.Drawing.Image]::FromStream($ms)
            
            $width = $img.Width
            $height = $img.Height
            
            # Resize if width > 800px
            if ($width -gt 800) {
                $ratio = 800.0 / $width
                $width = 800
                $height = [int]($height * $ratio)
            }
            
            $newImg = New-Object System.Drawing.Bitmap($width, $height)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $width, $height)
            $g.Dispose()
            
            $img.Dispose()
            $ms.Dispose()
            
            # Save as optimized JPEG
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]70)
            
            $newImg.Save($file.FullName, $codec, $encoderParams)
            $newImg.Dispose()
            Write-Host "Successfully compressed $($file.Name)"
        } catch {
            Write-Host "Failed to compress $($file.Name): $_"
        }
    }
}
Write-Host "Compression completed."
