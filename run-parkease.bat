@echo off
title ParkEase - Smart Parking Platform
echo ===================================================
echo     Launching ParkEase Smart Parking Platform      
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo [2/3] Building production assets...
call npm run build

echo.
echo [3/3] Starting Full-Stack Server on http://localhost:5000 ...
start http://localhost:5000
node server/index.js

pause
