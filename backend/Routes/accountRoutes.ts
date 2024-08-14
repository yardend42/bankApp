import { addOperation, getAllOperations } from "../logic/mongoDB_logic";
import { AccountOperationModel } from "../models/accountMongoDB";
import express, { NextFunction, Request, Response } from "express";
import { ClientError } from "../models/ClientsErrors";
import mongoose from "mongoose";

const accountRouter = express.Router();

/// GET: Retrieve all operations for a specific account
accountRouter.get(
  "/operations/:accountNumber",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const accountNumber = request.params.accountNumber;
      const actions = await getAllOperations(accountNumber);
      //if no actions in acount
      if (actions.length === 0) {
        throw new ClientError(
          404,
          `No operations found for account number: ${request.params.accountNumber}`
        );
      }
      console.log(actions)
      console.log(actions.length)
      response.status(200).json(actions);
    } catch (err) {
      next(err);
    }
  }
);

// POST: Add a new operation
accountRouter.post(
  "/operations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newOperation = new AccountOperationModel(request.body);
      const result = await addOperation(newOperation);
      response.status(201).json(result);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        // Handle Mongoose validation errors
        const messages = Object.values(err.errors).map(
          (error) => error.message
        );
        return response.status(400).json({ errors: messages });
      }
      // Handle ClientErrors specifically
      if (err instanceof ClientError) {
        return response.status(err.status).json({ message: err.message });
      }
      next(err); // Pass the error to the global error handler
    }
  }
);

export default accountRouter;
