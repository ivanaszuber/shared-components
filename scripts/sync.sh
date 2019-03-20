#!/bin/bash

RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z $1 ]
  then
    echo -e $RED"Sync error:" $NC "plesase provide a destination folder"
    exit 1
fi

npm run build:lib &&\
  # remove spec and test files
  rm ./lib/*/*.test.* &&\
  rm ./lib/*/*.spec.* &&\
  rsync -r ./lib/ $1
