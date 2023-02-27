@echo off 
set "file1=https://static.videezy.com/system/resources/previews/000/000/161/original/Volume2.mp4"
set "file2=https://www.tutorialspoint.com/static/images/logo-color.png"
set "file3=https://frozen-frontend.vercel.app/video/elsa.mp4"
set "file4=https://attrace.com/media/video.mp4"

node ./File_download_multiple/main.mjs %file2%
(
    start "" node ./File_download_multiple/main.mjs %file1%
    start "" node ./File_download_multiple/main.mjs %file2%
    start "" node ./File_download_multiple/main.mjs %file3%
    start "" node ./File_download_multiple/main.mjs %file4%
) | set /P "="

echo Download Completed