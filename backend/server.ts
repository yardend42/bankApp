// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import accountRoutes from './Routes/accountRoutes';
import config from './Utils/config';
import fileUpload from "express-fileupload";
import ErrorHandler from "./MiddleWare/routeNotFound";
import dal__mongodb from './DAL/dal__mongodb';

const server = express();

// Middleware
server.use(cors());
server.use(bodyParser.json());


//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//where i will save my files from upload
server.use(express.static("upload"));

//enable file uploading, and create a path for the files if it no exists
server.use(fileUpload({ createParentPath: true }));

server.use("/api/v1/accounts", accountRoutes)
//404 handler
server.use("*", ErrorHandler);

// Connect to MongoDB
//make the connection to mongoDB
dal__mongodb.connect();
// Use routes
server.use('/api', accountRoutes);

// Start the server
server.listen(config.webPort, () => {
    console.log(`listing on http://${config.webHost}:${config.webPort}`);
})