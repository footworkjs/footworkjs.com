![footwork.js](https://raw.github.com/jonbnewman/footwork/master/dist/gh-footwork-logo.png)
========

*```A solid footing for web applications.```*

This repository contains the source code for the main footwork.js website, as well as the different documentation releases. If you want to contribute to the main documentation, or the website in general then this is the repository you are looking for.

### Setting up this folder

The download widget on the front page won't work unless the releases folder is setup (which houses the different releases referenced on/from that widget). Follow these instructions if you wish to set that up.

For versions ```0.8.1``` and ```1.0.0```:
```bash
# Change to the 'releases' folder under the base path
cd releases

# Clone whatever versions you would like to have available
git clone -b 0.8.1 --single-branch --depth 1 git@github.com:jonbnewman/footwork.git 0.8.1
git clone -b 1.0.0 --single-branch --depth 1 git@github.com:jonbnewman/footwork.git 1.0.0
```

Thats it...the application will use this folder to lookup and provide the available releases inside of that widget.
