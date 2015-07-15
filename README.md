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

## Spec testing (constantly)

```
$ grunt spec
```

## Spec testing (single run)

```
$ grunt spec:single
```

## End to end testing

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
