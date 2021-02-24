#!/usr/bin/bash

mkdir build
cp -R source/v1/* build
cd build

# This is super scuffed but it works -_-
rm -rf example
rm -rf v1/tests
rm README.md