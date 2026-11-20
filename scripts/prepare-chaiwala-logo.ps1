param(
  [string]$SourcePath = 'C:\Users\HP\AppData\Local\Temp\codex-clipboard-9f2b9c89-eaff-4abc-8485-a226b58baf2c.png'
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $root 'public\assets\chaiwala-wordmark.png'
$source = [System.Drawing.Image]::FromFile($SourcePath)
$canvas = New-Object System.Drawing.Bitmap(1440, 320, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, 1440, 320))
$canvas.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose(); $canvas.Dispose(); $source.Dispose()
