import express from "express";
import appRouter from "./routers/app.router.js";
import path from "path";
import { fileURLToPath } from "url";

// ==== Variables ====
const app = express();
const { PORT, NODE_ENV } = process.env;

// ==== Middleware ====
// ---- Log ----
app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    const isoDate = new Date().toISOString();
    const startTime = new Date();
    
    next();
    
    const end = new Date();
    const timeGap = end.getTime() - startTime.getTime();
    const status = res.statusCode;
    
    console.log();
    console.log(`Mon url : ${url}`);
    console.log(`Ma méthode : ${method}`);
    console.log(`La date de la requête sous format ISO : ${isoDate}`);
    console.log(`Le temps de la requête et son statut : ${timeGap}ms [${status}]`);
})
// ---- Pagination ----
app.use((req, res, next) => {
    const offset = req.query.offset;
    const limit = req.query.limit;


    const pagination = {
        offset: isNaN(offset) ? 0 : parseInt(offset),
        limit: isNaN(limit) ? 10 : parseInt(limit)
    }

    req.pagination = pagination;

    next();
})

// ---- Afficher les images du dossier public ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));


// ==== Accès standard aux routes ====
app.use("/middleware", appRouter);

// ==== Middleware Error ====
app.use((error, req, res, next) => {
    console.log('Erreur : ' + error.cause);

    if (NODE_ENV === "dev") {
        res.status(500)
            .json({
                name: error.name, 
                message: error.message || "Aucun message", 
                content: error.stack
            })
    } else {
        res.status(500).json({
            message: `Une erreur s'est produite en production. Type d'erreur : ${error.name}`
        })
    }

    // next(error)
})

// ==== Serveur ====
app.listen(PORT, (error) => {
    if (error) {
        console.log('Erreur lors du démarrage du serveur !', error);
        return;
    }
    console.log(`Le serveur web tourne sur le port ${PORT} [${NODE_ENV}]`);
    console.log('mon serveur', `http://localhost:${PORT}`);
})
