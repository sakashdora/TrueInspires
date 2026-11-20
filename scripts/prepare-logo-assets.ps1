param(
  [string]$Source = 'C:\Users\HP\AppData\Local\Temp\codex-clipboard-26853310-0e0b-43e9-b595-3de7cfe5b05a.png',
  [string]$Destination = "$PSScriptRoot\..\public\assets"
)

Add-Type -AssemblyName System.Drawing

function Set-TransparentWhite([System.Drawing.Bitmap]$Bitmap) {
  for ($y = 0; $y -lt $Bitmap.Height; $y++) {
    for ($x = 0; $x -lt $Bitmap.Width; $x++) {
      $pixel = $Bitmap.GetPixel($x, $y)
      $minimum = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
      $maximum = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
      if ($minimum -gt 242 -and ($maximum - $minimum) -lt 12) {
        $Bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
      }
    }
  }
}

function Save-Crop([System.Drawing.Bitmap]$SourceBitmap, [System.Drawing.Rectangle]$Crop, [string]$Path) {
  $output = New-Object System.Drawing.Bitmap($Crop.Width, $Crop.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($output)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.DrawImage($SourceBitmap, (New-Object System.Drawing.Rectangle(0, 0, $Crop.Width, $Crop.Height)), $Crop, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.Dispose()
  $output.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $output.Dispose()
}

if (!(Test-Path -LiteralPath $Source)) { throw "The supplied logo reference was not found: $Source" }
New-Item -ItemType Directory -Force -Path $Destination | Out-Null

$sourceImage = [System.Drawing.Image]::FromFile($Source)
$logo = New-Object System.Drawing.Bitmap($sourceImage.Width, $sourceImage.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$copy = [System.Drawing.Graphics]::FromImage($logo)
$copy.DrawImage($sourceImage, 0, 0, $sourceImage.Width, $sourceImage.Height)
$copy.Dispose()
$sourceImage.Dispose()
Set-TransparentWhite $logo

$logo.Save((Join-Path $Destination 'true-inspire-logo-blue-primary.png'), [System.Drawing.Imaging.ImageFormat]::Png)
Save-Crop $logo (New-Object System.Drawing.Rectangle(536, 148, 440, 470)) (Join-Path $Destination 'true-inspire-logo-blue-monogram.png')
Save-Crop $logo (New-Object System.Drawing.Rectangle(208, 636, 1122, 126)) (Join-Path $Destination 'true-inspire-logo-blue-wordmark.png')

$nav = New-Object System.Drawing.Bitmap(900, 178, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$navGraphics = [System.Drawing.Graphics]::FromImage($nav)
$navGraphics.Clear([System.Drawing.Color]::Transparent)
$navGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$navGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$navGraphics.DrawImage($logo, (New-Object System.Drawing.Rectangle(12, 11, 145, 155)), (New-Object System.Drawing.Rectangle(536, 148, 440, 470)), [System.Drawing.GraphicsUnit]::Pixel)
$navGraphics.DrawImage($logo, (New-Object System.Drawing.Rectangle(180, 58, 696, 62)), (New-Object System.Drawing.Rectangle(208, 636, 1122, 126)), [System.Drawing.GraphicsUnit]::Pixel)
$navGraphics.Dispose()
$nav.Save((Join-Path $Destination 'true-inspire-logo-blue-navbar.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$nav.Dispose()

$icon = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$iconGraphics = [System.Drawing.Graphics]::FromImage($icon)
$iconGraphics.Clear([System.Drawing.Color]::Transparent)
$iconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$iconGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$iconGraphics.DrawImage($logo, (New-Object System.Drawing.Rectangle(44, 20, 424, 456)), (New-Object System.Drawing.Rectangle(536, 148, 440, 470)), [System.Drawing.GraphicsUnit]::Pixel)
$iconGraphics.Dispose()
$icon.Save((Join-Path $Destination 'true-inspire-logo-blue-monogram-512.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$icon.Dispose()
$logo.Dispose()
