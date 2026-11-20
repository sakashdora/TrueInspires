Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $root 'public\assets\true-inspire-logo-blue-primary.png'
$outputPath = Join-Path $root 'public\assets\true-inspire-social-share.png'
$width = 1200
$height = 630

$canvas = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = New-Object System.Drawing.Drawing2D.LinearGradientBrush([System.Drawing.Rectangle]::new(0, 0, $width, $height), [System.Drawing.Color]::FromArgb(4, 25, 62), [System.Drawing.Color]::FromArgb(7, 101, 158), 18)
$graphics.FillRectangle($background, 0, 0, $width, $height)
$orbBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(48, 100, 224, 251))
$graphics.FillEllipse($orbBrush, 735, 18, 505, 505)
$ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(115, 193, 239, 255), 2)
$graphics.DrawEllipse($ringPen, 700, 12, 530, 530)
$graphics.DrawEllipse($ringPen, 760, 74, 415, 415)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$graphics.DrawImage($logo, [System.Drawing.Rectangle]::new(785, 62, 335, 223))

$eyebrowFont = New-Object System.Drawing.Font('Arial', 15, [System.Drawing.FontStyle]::Bold)
$headingFont = New-Object System.Drawing.Font('Arial', 46, [System.Drawing.FontStyle]::Bold)
$bodyFont = New-Object System.Drawing.Font('Arial', 20, [System.Drawing.FontStyle]::Regular)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$iceBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(130, 230, 250))
$graphics.DrawString('INDEPENDENT DIGITAL STUDIO / ODISHA', $eyebrowFont, $iceBrush, 72, 132)
$graphics.DrawString('Websites and digital', $headingFont, $whiteBrush, 68, 190)
$graphics.DrawString('experiences built', $headingFont, $whiteBrush, 68, 246)
$graphics.DrawString('to be used.', $headingFont, $whiteBrush, 68, 302)
$graphics.DrawString('Strategy, design, and development for useful digital work.', $bodyFont, $iceBrush, 72, 388)

$canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bodyFont.Dispose(); $headingFont.Dispose(); $eyebrowFont.Dispose(); $whiteBrush.Dispose(); $iceBrush.Dispose(); $ringPen.Dispose(); $orbBrush.Dispose(); $background.Dispose(); $logo.Dispose(); $graphics.Dispose(); $canvas.Dispose()
