Set-Location -LiteralPath $PSScriptRoot
if (-not (Test-Path -LiteralPath 'dist/index.html')) {
    Write-Host 'Jalankan npm ci dan npm run build terlebih dahulu.'
    exit 1
}
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173
