@echo off

rem Get the current directory
set "current_directory=%CD%"

rem Pull the latest changes from the repository
git pull origin master

rem Run the admin panel
set "admin_panel_run=cd code/frontend && code . && ng s --open"
start /max cmd /k "cd /d %current_directory% && %admin_panel_run%"

rem Run the backend
set "backend_run=cd code/backend && code . && npm run dev"
start /max cmd /k "cd /d %current_directory% && %backend_run%"
