import koa from 'koa';
import handlebars from 'koa-handlebars';
import koaRouter from 'koa-router';

const app = koa();
const router = new koaRouter();

require('dotenv').load();

var port = process.env.PORT;

app.use(handlebars({
        layoutsDir: 'app/layouts',
        viewsDir: 'app/views',
        defaultLayout: 'index'
    }));

app.use(router.routes())
app.use(router.allowedMethods())
app.use(function *(){
    yield this.render('404', {
        title: 'Page not found'
    });
});

app.listen(port);
console.log('Application started on port: ' + port);
