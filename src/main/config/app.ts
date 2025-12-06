import express from "express";
import setupMiddleWare from "./middlewares";
import setupRoutes from "./routes";

const app = express();
setupMiddleWare(app);
setupRoutes(app);

export default app;
