import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import incidentTypes from './routes/incidentTypeRoute';
import incidents from './routes/incidentRoute';
import complementaryTaskCategories from './routes/complementaryTaskCategoryRoute';
import vesselVisitExecutions from './routes/vesselVisitExecutionRoute';
import port3DVisualization from './routes/port3DVisualizationRoute';
import operationPlans from './routes/operationPlanRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	incidentTypes(app);
	incidents(app);
	complementaryTaskCategories(app);
	vesselVisitExecutions(app);
	port3DVisualization(app);
	operationPlans(app);
	
	return app
}