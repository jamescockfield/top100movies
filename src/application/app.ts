import express, { Request, Response } from 'express';

import EXPRESS_PORT from './config/expressConfig';


const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world');
});

app.listen(EXPRESS_PORT, () => {
	console.log(`Listening on ${EXPRESS_PORT}`);
});
