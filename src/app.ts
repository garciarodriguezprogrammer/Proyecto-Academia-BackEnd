import express, { Application } from "express";
import router from "./router";

const app: Application = express();

// Middleware para configurar encabezados CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite peticiones de cualquier origen
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());
app.use(router);

export default app;
