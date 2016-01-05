# Ionic Hello World

## Preparing node (Debian/Ubuntu)

```
$ cd ~
$ sudo apt-get install build-essential git
$ git clone https://github.com/creationix/nvm.git .nvm
$ . ~/.nvm/nvm.sh
$ nvm ls-remote
$ echo stable > ~/.nvmrc
$ nvm install
$ echo '{"private":true}' > ~/package.json
$ npm install --save npm
$ export PATH="node_modules/.bin:../node_modules/.bin:$HOME/node_modules/.bin:$PATH"
```

## Peparing working directory

```
$ cd <working directory>
$ npm install
$ bower install
```

## List available tasks

```
$ gulp help
```

## Run in browser and watch for changes (development)

```
$ gulp serve
```

## Spec testing (single run)

```
$ gulp spec
```

## End to end testing (single run, requires serve task)

```
$ gulp e2e
```

## Build project (uncompressed)

```
$ gulp build:dev
```

## Build project (compressed)

```
$ gulp build
```

## Install Cordova plugins

```
$ gulp cordova:plugins:install
```

## Install Cordova platforms

```
$ gulp cordova:platform:install
```

## Regenerate Cordova resources

```
$ ionic resource
```

## Run Cordova project

```
$ gulp cordova:run
```

## Change version number for application

```
$ gulp bump --setversion=0.0.2
```

## Upgrade libraries

```
$ ncu -ua
$ npm install
```

## Upgrade assets

```
$ ncu -m bower -ua
$ npm install
```

## Upgrade Cordova platform

```
$ gulp cordova:platform:update
```

## Upgrade Cordova plugins

```
$ gulp cordova:plugins:upgrade
```
