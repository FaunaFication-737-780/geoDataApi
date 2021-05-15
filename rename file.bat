@echo off
:start
setlocal enabledelayedexpansion
set isrun=n

echo drop folder
set dir=n&set /p dir=
if "%dir:"=%"=="n" cls&goto start
cls&echo ====================================
:run
for /f "delims=" %%i in ('dir /s /b /a:-d %dir%\*.*') do (
    set full=%%~dpnxi
    set exten=%%~xi
    set path=%%~dpi
    set path=!path:~0,-1!
    for /f "delims=" %%j in ("!path!") do set path=%%~nj
    if /i "!isrun!"=="n" (
        echo ren "!full!" "!path!!exten!"
    ) else (
        ren "!full!" "!path!!exten!"
        echo changeto:"!path!!exten!"
    )   
)
echo ====================================
if /i "%isrun%"=="n" (
    echo process?[Y/N]
    set isrun=n&set /p isrun=
    if /i "!isrun!"=="y" ( goto run ) else ( cls&goto start )
) else (
    echo.&echo complete！
    echo anykeyToReturn&pause>nul&cls&goto start   
)