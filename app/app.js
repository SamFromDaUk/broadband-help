var koa = require('koa'),
    app = koa(),
    port,
    handlebars = require("koa-handlebars");

require('dotenv').load();

port = process.env.PORT;

app.use(handlebars({
    layoutsDir: 'app/layouts',
    viewsDir: 'app/views',
    defaultLayout: 'index'
}));

app.use(function *() {
  yield this.render('index', {
    title: 'Test Page',
    name: 'World'
  });
});

console.log('Application started on port: ' + port);
app.listen(port);
