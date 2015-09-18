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

## Start mock server

```
$ gulp mock
```

## Run in browser and watch for changes (development)

```
$ gulp serve
```

## Spec testing (single run)

```
$ gulp spec
```

## End to end testing (single run, requires mock and serve task)

```
$ gulp e2e
```

## Build project

```
$ gulp build
```
