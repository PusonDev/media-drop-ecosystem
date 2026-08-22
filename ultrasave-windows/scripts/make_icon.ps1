Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\wahid\.gemini\antigravity-ide\brain\8c9b25cf-0924-4dfb-aa8d-1c71aff35985\mediadrop_app_icon_1787432391663.jpg"
$destPng = "e:\All coding installation tools\All My Main Project in real world\free-social-media-video-audio-downloader-ecosystem\ultrasave-windows\public\app-icon.png"
$destIco = "e:\All coding installation tools\All My Main Project in real world\free-social-media-video-audio-downloader-ecosystem\ultrasave-windows\public\icon.ico"

$srcImage = [System.Drawing.Image]::FromFile($sourcePath)
$bitmap = New-Object System.Drawing.Bitmap 256, 256
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($srcImage, 0, 0, 256, 256)

$graphics.Dispose()
$srcImage.Dispose()

# Save PNG
$bitmap.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

# Save ICO
$hIcon = $bitmap.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = New-Object System.IO.FileStream($destIco, [System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()
$bitmap.Dispose()

Write-Output "ICO and PNG generated successfully."
