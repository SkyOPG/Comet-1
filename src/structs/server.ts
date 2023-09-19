import type {Express} from 'express';
import express from 'express';
import cookie from 'cookie-parser';
import body from 'body-parser';
import Keys from '../keys.js';
const app: Express = express();
const port = parseInt(Keys.port);

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(body.json())
app.use(express.static('public'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookie());
app.set('view engine', 'ejs');

// Routes
import indexRoute from './routes.js';
app.use('/', indexRoute);

// Start the server and login the bot
app.listen(port, () => {
	console.log('0--------------| Dashboard');
	console.log(`Dashboard running on localhost:${port}`);
});
