Set-Location 'd:\CODING\SHATRANJ'
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   CLOUDFLARE WORKERS DEPLOYMENT: KNIGHTESLINE   " -ForegroundColor Gold
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Authenticating with Cloudflare..." -ForegroundColor Yellow
npx wrangler login
Write-Host ""
Write-Host "Step 2: Uploading dist to https://knightesliner.tguneev.workers.dev/..." -ForegroundColor Green
npx wrangler deploy
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   DEPLOYMENT FINISHED! You can close this window. " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
