import { Router } from 'express';
import task from './taskRoute';
export default () => {
	const app = Router();

	
	task(app);

	return app
}