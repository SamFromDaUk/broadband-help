import koa from 'koa';
import handlebars from 'koa-handlebars';
import koaRouter from 'koa-router';

const app = koa();
const router = new koaRouter();

require('dotenv').load();
import assets from './components/masthead-injector.js';

var port = process.env.PORT;

app.use(handlebars({
    layoutsDir: 'app/layouts',
    viewsDir: 'app/views',
    defaultLayout: 'index'
}));

console.log('MASTHEAD: loading');

assets.then(function(masthead) {
    console.log('MASTHEAD: loaded');

    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(function *(){
        this.status = 404;
        yield this.render('404', {
            title: 'Page not found',
            masthead: masthead
        });
    });

    app.listen(port);
});




console.log('Application started on port: ' + port);
