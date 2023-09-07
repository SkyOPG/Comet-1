/* eslint-disable @typescript-eslint/naming-convention */
import express from 'express';
import type {Router, Request, Response} from 'express';
// eslint-disable-next-line new-cap
const router: Router = express.Router();
import bl from './client.js';
import type {Client} from 'discord.js';
import file from '../commands/index.js';
import axios from 'axios';
import Keys from '../keys.js';
import fsch from '../utils/Schemas/files.js';

const bcl: Client<true> = bl;

// Dashboard
router.get('/', (req, res) => {
	let url: string;
	let logged: string;
	if (req.cookies.auth) {
		url = '/dash';
		logged = 'Dashboard';
	} else {
		url = '/login';
		logged = 'Login';
	}

	const guilds = bcl.guilds.cache.size;
	const users = bcl.users.cache.size;
	const comands: number = (file.commands as Map<string, Record<string, unknown>>).size;
	const pfp = bcl.user.displayAvatarURL();
	res.render('home', {guilds, users, comands, pfp, url, logged});
});

// Guild selector, TODO: add the guilds to check :skull:
router.get('/guilds', (req: Request, res: Response) => {
	const clientId = bcl.user.id;
	const clientSecret = Keys.secret;
	const redirectUri = 'localhost:3000/login';
	const authorizationCode = req.cookies.auth as string;

	const params = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		grant_type: 'authorization_code',
		code: authorizationCode,
		redirect_uri: redirectUri,
		scope: 'identify guilds', // Include both scopes
	});

	axios
		.post('https://discord.com/api/oauth2/token', params)
		.then(response => {
			const accessToken = response.data.access_token as string;
			console.log('Access Token:', accessToken);
		})
		.catch(error => {
			console.error('Error exchanging code for access token:', error.response.data);
		});
	res.render('guilds');
});

router.get('/invite', (req, res) => {
	res.render('invite');
});

// Guild editor, TODO: cookie checks
router.get('/guilds/:guildId/edit', (req, res) => {
	const {guildId} = req.params;
	res.render('edit', {guildId});
});

router.get('/api/v1/files/:file', async (req, res) => {
	const {file} = req.params;
	const data: {
		Filename: string;
		Owner: string;
		Views: number;
		Forks: number;
		FileData: {
			isPrivate: boolean;
			Code: string;
		};
	} = (await fsch.model.findOne({Filename: file}) as unknown) as {
		Filename: string;
		Owner: string;
		Views: number;
		Forks: number;
		FileData: {
			isPrivate: boolean;
			Code: string;
		};
	};
	if (data) {
		if (data.FileData.isPrivate) {
			res.render('err');
			return;
		}

		const src = data.FileData.Code;
		const code = src;
		res.render('view', {code, file});
	} else {
		res.render('err');
	}
});

router.get('/dashboard', (req, res) => {
	console.log(`${req.cookies.auth}`);
	res.status(200).redirect('/');
});

router.get('/login', (req, res) => {
	if (req.query.code) {
		let token;
		res.cookie('auth', req.query.code);
		if (req.cookies.token === null || req.cookies.token === undefined) {
			res.cookie('token', token);
		}

		res.status(200).redirect('/dashboard');
	} else {
		res.status(200).redirect('');
	}
});

export default router;
// https://localhost:3000
