import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { envVars } from './app/config/env';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './app/lib/auth';
import { IndexRoutes } from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({
    origin : [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders : ["Content-Type", "Authorization"]
}))

// application routes
app.use("/api/auth", toNodeHandler(auth))

app.use("/api/v1", IndexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from PlayTube World!');
});

export default app;
