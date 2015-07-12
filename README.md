This is template for Ionic application with karma+mocha-chai unit tests and
webdriverio e2e tests.

## Preparing node

```
$ cd ~
$ sudo apt-get install build-essential
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
$ . ~/.bashrc
$ nvm ls-remote
$ nvm install stable
$ npm update npm
```

## Peparing dev

```
$ cd <working directory>
$ node install
$ bower install
$ ionic platform android
$ ionic resources
```

## Unit testing (constantly)

```
$ grunt test
```

## Unit testing (single run)

```
$ grunt test:single
```

## Unit testing (end to end)

```
$ grunt e2e
```

## Running in browser

```
$ grunt serve
```

## Running in browser with Ripple emulator

```
$ grunt ripple
```

## Running natively

```
$ grunt run
```
