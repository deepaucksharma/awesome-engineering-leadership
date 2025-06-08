Write-Host ""
Write-Host "Checking GitHub Pages Deployment Status..." -ForegroundColor Cyan
Write-Host ""

# Check main site
Write-Host "Main Site:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://deepaucksharma.github.io/awesome-engineering-leadership/" -Method Head -TimeoutSec 5 -UseBasicParsing
    Write-Host "OK - Accessible" -ForegroundColor Green
} catch {
    Write-Host "PENDING - Not ready yet" -ForegroundColor Yellow
}

# Check System Design Mastery
Write-Host ""
Write-Host "System Design Mastery App:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://deepaucksharma.github.io/awesome-engineering-leadership/system-design-mastery/" -Method Head -TimeoutSec 5 -UseBasicParsing
    Write-Host "OK - Accessible" -ForegroundColor Green
} catch {
    Write-Host "BUILDING - Next.js app is being deployed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Check build progress at:" -ForegroundColor Cyan
Write-Host "https://github.com/deepaucksharma/awesome-engineering-leadership/actions" -ForegroundColor Blue
