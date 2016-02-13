# how to develop
## 1. install gems and browserSync

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

### Notes on performance:
With the `node_module` and other library folders excluded, the jekyll watch should be very speedy.