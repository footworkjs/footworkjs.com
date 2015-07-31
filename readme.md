![footwork.js](https://raw.github.com/reflectiveSingleton/footwork/master/dist/gh-footwork-logo.png)
========

*```A solid footing for web applications.```*

This repository contains the source code for the main footwork.js website, as well as the different documentation releases. If you want to contribute to the main documentation, or the website in general then this is the repository you are looking for.

Related links:

* [Main Website](http://footworkjs.com/ "http://footworkjs.com")

* [Documentation/API](http://footworkjs.com/docs/list "Documentation and API information")

* [Tutorials](http://footworkjs.com/tutorials "Tutorials and guides")

[![Join the chat at https://gitter.im/reflectiveSingleton/footwork](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/reflectiveSingleton/footwork?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Running this code

The main footwork website is a Laravel 5 PHP application, so you will need a system that has php 5.4 or later installed.

1) **Clone the repo from GitHub:**

```bash
git clone https://github.com/reflectiveSingleton/footwork-site.git
cd footwork-site
```

2) **Acquire PHP dependencies:**

Make sure you have [composer installed](https://getcomposer.org/download/), then run the following:

```bash
# Warning, this command will take a while most likely
composer install
```

3) **Acquire npm and bower dependencies:**

Make sure you have [node.js](http://nodejs.org/) and [bower](http://bower.io/) installed in your environment, then run the following:

```bash
npm install && bower install
```

4) **Rename .env.example file**

Laravel uses a local ```.env``` file to determine what environment the application is running in. The repository has an example one saved as ```.env.example```. You will need to rename this file to ```.env```.

4a) (optional) **Edit .env file and setup the releases folder**

The download widget on the front page won't work unless the releases folder is setup (which houses the different releases referenced on/from that widget). Follow these instructions if you wish to set that up.

Edit the ```.env``` file and change the FOOTWORK_RELEASES_FOLDER path to a new empty folder on your system. Once you have done that you will need to create a different folder for each release, and pull down that version of footwork into it.

For example, for versions ```0.8.1``` and ```1.0.0```:
```bash
cd footwork-releases-folder
git clone -b 0.8.1 --single-branch --depth 1 git@github.com:reflectiveSingleton/footwork.git 0.8.1
git clone -b 1.0.0 --single-branch --depth 1 git@github.com:reflectiveSingleton/footwork.git 1.0.0
```

And thats it...the application will use that folder to lookup and provide the available releases inside of that widget.

5) **Set permissions on the storage directory**

```bash
# This allows laravel to create its cache/etc
chmod -R a+rw storage
```

6) **Run the site**

This final step is necessary if you do not have your own HTTP server setup locally.

```bash
cd public
php -S localhost:8000

# access the site locally on your browser at http://localhost:8000
```

### License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

[![Analytics](https://ga-beacon.appspot.com/UA-52543452-1/footwork/GITHUB-ROOT)](https://github.com/reflectiveSingleton/ga-beacon)
