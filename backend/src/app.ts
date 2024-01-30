import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser"; // Corrected the import statement
import morgan from 'morgan';
import cors from 'cors';
import AccountRoutes from "./routes/AccountRoutes";
import PackageRoutes from "./routes/PackageRoutes";
import swaggerUI from 'swagger-ui-express';
import LocationRoutes from "./routes/LocationRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UsersRoutes from "./routes/UsersRoutes";
import GroupRoutes from "./routes/GroupRoutes";
import GroupUserRoutes from "./routes/GroupUserRoutes";
import MessagesRoutes from "./routes/MessagesRoutes";
import { RESPONSE_STATUS } from "./middlewares/request-body-validator";
import PurchaseRoutes from "./routes/PurchaseRoutes";
import FeedbackRoutes from "./routes/FeedbackRoutes";
const swaggerDocument = require("./swagger.json");

const app = express();

// Log requests
app.use(morgan('combined'));

// Enable CORS for all origins
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// Route handlers
app.use("/auth", AccountRoutes);
app.use("/packages", PackageRoutes);
app.use("/locations", LocationRoutes);
app.use("/admins", AdminRoutes);
app.use("/users", UsersRoutes);
app.use("/messages", MessagesRoutes);
app.use("/groups", GroupRoutes);
app.use("/groupUser", GroupUserRoutes);
app.use("/purchase", PurchaseRoutes);
app.use("/feedback", FeedbackRoutes);

// Swagger API documentation
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Problem Occured !',
    });
});

module.exports = app;
