import express from "express";

import filmsRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", filmsRouter);

let count = 0;
app.use((req, _res, next) =>{
    if(req.method === "GET"){
        count++;
        console.log('GET counter : ${count}')
    }
    next();
});

export default app;
