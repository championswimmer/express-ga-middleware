# Express GA Middleware

This is an [express](http://expressjs.com) middleware to enable
[Google Universal Analytics](http://analytics.google.com)
page tracking on your server.
You can use this with server-served pages, or any custom route
events.

[![TypeScript](https://img.shields.io/badge/TypeScript-declared-blue.svg)](https://typescriptlang.org/)

[![NPM](https://nodei.co/npm/express-ga-middleware.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-ga-middleware/)

## Install

```
npm install --save express-ga-middleware
```


## Usage

To simply track page views use this -

```javascript
const app = require('express')();
const expressGa = require('express-ga-middleware');

app.use(expressGa('UA-XXXXXX-X'));

app.get('/', function (req, res) { res.send('hello world') } );

app.listen(4040);
```


If you also want to generate events, we have a .event() middleware too.
```js
var expGa = expressGa('UA-XXXXXX-X');

//Use globally for all pageviews
app.use(expGa);

//Use event on a path
app.use('/path/of/event', expGa.event({
    category: 'cat',
    action: 'act',
    label: 'lab',
    value: 3.5
}),
    function (req, res) {
    //your path middleware code here
});
```

The .event() function is available in the `req` object too, 
inside `ga` object.

```js
app.use(expressGa('UA-XXXXXX-X'));

app.get('/', (req, res) => {
  req.ga.event({
      category: 'cat',
      action: 'act',
      label: 'lab',
      value: 3.5
  }, (err) => {
    if (err) throw err
  })
  res.send('Hello World')
})
```

## What it tracks

The middleware automatically tracks the following

| Tracked parameter | Description |
|-------------------|-------------|
| **document path** | Part of the URL, after the domain name, i.e. **/b/c** in  http://a.com/b/c |
| **document referer** | The website from which the user came from, if any |
| **user agent** | The device/browser/OS used to browse the page |
| **ip address** | The user's ip Address|

All of this is fetched from the _**request**_ object. Here is the code basically -

```javascript
    dp: req.originalUrl,
    dr: req.get('Referer'),
    ua: req.headers['user-agent'],
    uip: req.headers['x-forwarded-for'].split(',').pop()
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress

```

## Thanks

This is a wrapper over the very useful node module [universal-analytics](http://npmjs.com/universal-analytics)
which in turn used the `http://www.google-analytics.com/collect` REST API.