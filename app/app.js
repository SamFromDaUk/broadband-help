var koa = require('koa'),
    app = koa(),
    port;

port = 3000;

app.use(function *() {
  this.body = 'Hello World';
});

console.log('Application started on port: ' + port);
app.listen(port);
