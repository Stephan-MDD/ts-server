import express, { Application, json } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

// configuration
const app: Application = express();
const port: number = 4000;

// middleware
app.use(cors()); // enables cross origin access
app.use(json()); // transforms payload to json format

// simple in memory data store
let storeProxy: string[] = [];

// get all/ query item
app.get('/', (req: Request, res: Response) => {
	return res.send(storeProxy);
});

// get item
app.get('/:id', (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	const item: string = storeProxy[id];
	return res.send(item);
});

// create item
app.post('/', (req: Request, res: Response) => {
	const item: string = req.body.item;
	storeProxy.push(item);
	return res.send(storeProxy);
});

// update item
app.put('/:id', (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	const item: string = req.body.item;
	storeProxy[id] = item;
	return res.sendStatus(204);
});

// delete item
app.delete('/:id', (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	storeProxy = storeProxy.filter((item, index) => index !== id);
	return res.sendStatus(204);
});

// execution
app.listen(port, () => console.log(`Running @ http://localhost:${port}`));
