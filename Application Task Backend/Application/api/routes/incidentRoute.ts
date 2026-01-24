import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from "../../../config";
import IIncidentController from '../../controllers/IControllers/IIncidentController';
import { level } from 'winston';

const route = Router();


/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Get all Incidents
 *     tags:
 *       - Incident
 *     responses:
 *       200:
 *         description: List of Incidents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create Incident
 *     tags:
 *       - Incident
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               incidentType:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               level:
 *                 type: string
 *               description:
 *                 type: string
 *               responsibleUser:
 *                 type: string
 *               vesselVisitExecutions:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - incidentType
 *               - startTime
 *               - level
 *               - description
 *               - responsibleUser
 *               - vesselVisitExecutions
 *     responses:
 *       201:
 *         description: Created
 *
 * /incidents/dateRange/{startDate}/{endDate}:
 *   get:
 *     summary: Get Incidents by date range
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Incidents in date range
 *
 * /incidents/vessel/{vesselId}:
 *   get:
 *     summary: Get Incidents by vessel ID
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: vesselId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Incidents for vessel
 *
 * /incidents/severity/{level}:
 *   get:
 *     summary: Get Incidents by severity level
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Incidents by severity
 *
 * /incidents/status/{status}:
 *   get:
 *     summary: Get Incidents by status
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Incidents by status
 *
 * /incidents/{id}/resolve:
 *   patch:
 *     summary: Mark Incident as resolved
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Incident marked as resolved
 *       404:
 *         description: Not found
 *   get:
 *     summary: Get Incident by ID
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Incident found
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update Incident
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               incidentType:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               level:
 *                 type: string
 *               description:
 *                 type: string
 *               responsibleUser:
 *                 type: string
 *               vesselVisitExecutions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete Incident
 *     tags:
 *       - Incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
export default (app: Router) => {
    app.use('/incidents', route);

    const ctrl = Container.get(config.controllers.incident.name) as IIncidentController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                incidentType: Joi.string().required(),
                startTime: Joi.date().required(),
                level: Joi.string().required(),
                description: Joi.string().required(),
                responsibleUser: Joi.string().required(),
                vesselVisitExecutions: Joi.array().items(Joi.string()).min(1).required(),
            }),
        }),
        (req, res, next) => ctrl.createIncident(req, res, next)
    );

    route.get('', (req, res, next) => ctrl.getIncidents(req, res, next));


    route.get(
        '/dateRange/:startDate/:endDate',
        celebrate({
            params: Joi.object({
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getIncidentsByDateRange(req, res, next)
    );

    route.get(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getIncidentById(req, res, next)
    );

    route.get(
        '/vessel/:vesselId',
        celebrate({
            params: Joi.object({
                vesselId: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getIncidentsByVessel(req, res, next)
    );

    route.get(
        '/severity/:level',
        celebrate({
            params: Joi.object({
                level: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getIncidentsBySeverity(req, res, next)
    );

    route.get(
        '/status/:status',
        celebrate({
            params: Joi.object({
                status: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getIncidentsByStatus(req, res, next)
    );

    route.put(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                level: Joi.string().optional(),
                description: Joi.string().optional(),
                responsibleUser: Joi.string().optional(),
                vesselVisitExecutions: Joi.array().items(Joi.string()).min(1).optional(),
            }),
        }),
        (req, res, next) => ctrl.updateIncident(req, res, next)
    );

    route.delete(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteIncident(req, res, next)
    );

    route.patch(
        '/:id/resolve',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                endTime: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.markIncidentAsResolved(req, res, next)
    );
};