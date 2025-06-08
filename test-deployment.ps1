# Test GitHub Pages Deployment
Write-Host "🔍 Testing GitHub Pages Deployment..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# URLs to test
$mainUrl = "https://deepaucksharma.github.io/awesome-engineering-leadership/"
$systemDesignUrl = "https://deepaucksharma.github.io/awesome-engineering-leadership/system-design-mastery/"

# Test main site
Write-Host "Testing main site..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri $mainUrl -UseBasicParsing -Method Head -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Main site is accessible" -ForegroundColor Green
        Write-Host "   URL: $mainUrl" -ForegroundColor Gray
    }
} catch {
    Write-Host "⏳ Main site not yet accessible (this is normal for first deployment)" -ForegroundColor Yellow
    Write-Host "   It may take 5-10 minutes for GitHub Pages to activate" -ForegroundColor Gray
}

Write-Host ""

# Test System Design page
Write-Host "Testing System Design Mastery page..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri $systemDesignUrl -UseBasicParsing -Method Head -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ System Design page is accessible" -ForegroundColor Green
        Write-Host "   URL: $systemDesignUrl" -ForegroundColor Gray
    }
} catch {
    Write-Host "⏳ System Design page not yet accessible" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📊 GitHub Actions Status:" -ForegroundColor Cyan
Write-Host "Check deployment progress at:" -ForegroundColor White
Write-Host "https://github.com/deepaucksharma/awesome-engineering-leadership/actions" -ForegroundColor Blue

Write-Host ""
Write-Host "🔧 GitHub Pages Settings:" -ForegroundColor Cyan
Write-Host "Verify configuration at:" -ForegroundColor White
Write-Host "https://github.com/deepaucksharma/awesome-engineering-leadership/settings/pages" -ForegroundColor Blue

Write-Host ""
Write-Host "Note: First-time GitHub Pages deployment can take up to 10 minutes." -ForegroundColor Yellow
Write-Host "If the sites aren't accessible yet, please wait a few minutes and try again." -ForegroundColor Yellow
