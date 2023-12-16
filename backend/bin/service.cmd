rem @echo off

set home="C:\OpenRestDB"
set java_home="C:\Program Files\Java\jdk-17.0.1"
%java_home%\bin\java -cp %home%\lib\openrestdb-2.1.jar database.rest.control.Service
