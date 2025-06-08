Write-Host ""
Write-Host "GitHub Actions Build Status" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Latest push:" -ForegroundColor Yellow
Write-Host "- Commit: 'Trigger full Next.js build deployment with interactive features'" -ForegroundColor Gray
Write-Host "- Time: Just now" -ForegroundColor Gray
Write-Host ""

Write-Host "Workflow: Deploy Complete Site" -ForegroundColor Yellow
Write-Host "Status: TRIGGERED - Check progress at:" -ForegroundColor Green
Write-Host ""
Write-Host "https://github.com/deepaucksharma/awesome-engineering-leadership/actions" -ForegroundColor Blue
Write-Host ""

Write-Host "Build steps:" -ForegroundColor Yellow
Write-Host "1. Checkout code" -ForegroundColor Gray
Write-Host "2. Setup Node.js" -ForegroundColor Gray
Write-Host "3. Install dependencies" -ForegroundColor Gray
Write-Host "4. Build Next.js app" -ForegroundColor Gray
Write-Host "5. Deploy to GitHub Pages" -ForegroundColor Gray
Write-Host ""

Write-Host "Expected completion: ~5 minutes" -ForegroundColor Yellow
Write-Host ""

# Quick check if site is already updated
Write-Host "Checking current deployment..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://deepaucksharma.github.io/awesome-engineering-leadership/system-design-mastery/" -UseBasicParsing
    if ($response.Content -like "*Coming Soon*") {
        Write-Host "Current status: Placeholder page (build in progress)" -ForegroundColor Yellow
    } else {
        Write-Host "Current status: Full app may be deployed!" -ForegroundColor Green
    }
} catch {
    Write-Host "Current status: Unable to check" -ForegroundColor Red
}
