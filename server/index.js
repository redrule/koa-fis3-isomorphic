'use strict';

const http = require('http');

const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const stylus = require('koa-stylus');

const session = require('koa-session-redis3');
const koaBody = require('koa-body');
const router = require('./routes');

// Create koa app
const app = koa();

// middleware
app.use(logger());

//设置静态目录内容
app.use(serve('./pages')).use(serve('./mock')).use(serve('./Public'));

app.keys = ['xiaodao360'];
app.use(session({
	store: {
		host: process.env.SESSION_PORT_6379_TCP_ADDR || '127.0.0.1',
		port: process.env.SESSION_PORT_6379_TCP_PORT || 6380,
		ttl: 3600,
		keySchema: 'your:schema',
		key: 'XD:session'
	}
}));


app.use(koaBody({
	formidable: {
		uploadDir: __dirname
	}
}));

/**
 * 运行时错误处理，这里很重要
 * @param  {[type]}	[description]
 * @return {[type]} [description]
 */
app.on('error', function(err) {
	log.error('server error', err);
});

app.use(router.routes());



// 创建服务器监听
http.createServer(app.callback()).listen(8085);
// app.listen(3000);

console.log('Server listening on port 8085');