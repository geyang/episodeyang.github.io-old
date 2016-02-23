# how to develop
## 1. install gems and browserSync

[![Join the chat at https://gitter.im/episodeyang/episodeyang.github.io](https://badges.gitter.im/episodeyang/episodeyang.github.io.svg)](https://gitter.im/episodeyang/episodeyang.github.io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

run: 
```shell
bundle install
npm install
npm install -g browser-sync
```

## 2. To kick start the development:

run:
```shell
npm start # this kick starts the jekyll server
npm run watch # this kick starts the browserSync proxy server, and watches the `_site` folder for updated output files.
```

## 3. To test for github page production mode

run
```shell
jekyll build --safe
```

### Notes on performance:
With the `node_module` and other library folders excluded, the jekyll watch should be very speedy.