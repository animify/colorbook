#!/bin/bash
#
# The Colorbook build script
#
# Copy html to build
# ./build.sh copy
#
# Build the client
# ./build.sh client
#
# Recreate the database
# ./build.sh db
#
# Recreate the database, build client and copy html
# ./build.sh

function BUILD_CLIENT {
    rm -rf build
    mkdir build
    npm run build:client
    echo -e "\e[35m Client built. \033[0m"
}

function COPY_HTML {
    cp client/local.html build/index.html
    echo -e "\e[35m Index.html created in ./build \033[0m"
}

function DESTROY_DB {
    rm -rf server/database/shots.json
    touch server/database/shots.json
    echo -e "\e[35m Database recreated. \033[0m"
}

if [[ $1 == "client" ]]; then
BUILD_CLIENT
echo -e "\e[37m\e[42m Client build completed.\033[0m"
elif [[ $1 == "copy" ]]; then
COPY_HTML
echo -e "\e[37m\e[42m Copy completed.\033[0m"
elif [[ $1 == "db" ]]; then
COPY_HTML
elif [[ $1 == "prod" ]]; then
DESTROY_DB
BUILD_CLIENT
COPY_HTML
cp -R build/* /var/www/colorbook.me
echo -e "\e[37m\e[42m Database recreated.\033[0m"
elif [ $# -eq 0 ]; then
DESTROY_DB
BUILD_CLIENT
COPY_HTML
echo -e "\e[37m\e[42m Build & copy completed.\033[0m"
fi
