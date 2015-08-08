![footwork.js](https://raw.github.com/jonbnewman/footwork/master/dist/gh-footwork-logo.png)
========

*```A solid footing for web applications.```*

This folder contains the releases referenced by the download widget.

### Setting up this folder

The download widget on the front page won't work unless this releases folder contains one or more available releases to reference. Follow these instructions if you wish to set that up.

For example, if you wanted to provide versions ```0.8.1``` and ```1.0.0``` via the download widget:
```bash
# Change to the 'releases' folder under the base path (if you are reading this there, you are already here)
cd releases

# Clone whatever versions you would like to have available
git clone -b 0.8.1 --single-branch --depth 1 git@github.com:jonbnewman/footwork.git 0.8.1
git clone -b 1.0.0 --single-branch --depth 1 git@github.com:jonbnewman/footwork.git 1.0.0
```

Thats it...the application will use this folder to lookup and provide the available releases inside of that widget.
