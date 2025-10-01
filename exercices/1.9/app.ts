import express from "express";

import textesRouter from "./routes/textes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



let count = 0;
app.use((req, _res, next) =>{
    if(req.method === "GET"){
        count++;
        console.log(`GET counter : ${count}`);
    }
    next();
});

app.use("/textes", textesRouter);
export default app;
