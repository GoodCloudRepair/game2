@echo off
setlocal
set "BUNDLED_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if exist "%BUNDLED_NODE%" (
  "%BUNDLED_NODE%" "%~dp0matrix-demo-server.mjs"
  goto :eof
)

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  pause
  exit /b 1
)

node "%~dp0matrix-demo-server.mjs"
