mkdir build
cp -R source/v1/* build
cd build

# This is super scuffed but it works -_-
rm -rf tests
rm README.md