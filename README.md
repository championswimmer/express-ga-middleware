# Express GA Middleware

This is an [express](http://expressjs.com) middleware to enable
[Google Universal Analytics](http://analytics.google.com)
page tracking on your server.
You can use this with server-served pages, or any custom route
events.

## Install

```
npm install --save express-ga-middleware
```


## Usage

```javascript
const app = require('express')();
const expressGa = require('express-ga-middleware');

app.use(expressGA('UA-XXXXXX-X');

app.get('/', function (req, res) { res.send('hello world') } );

app.listen(4040);
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