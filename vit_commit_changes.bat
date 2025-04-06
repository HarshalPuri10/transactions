@echo off
set /p msg=Enter commit message: 
git add .
git commit -m "%msg%"
git pull origin master
git push origin master

IF %ERRORLEVEL% EQU 0 (
    echo Task completed successfully.
) ELSE (
    echo Task failed or encountered an error.
)
 