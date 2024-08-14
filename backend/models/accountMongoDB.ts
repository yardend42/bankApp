import { Document, Schema, model } from "mongoose";

// Interface describing the structure of an operation document
export interface IAccountOperation extends Document {
  //object id=> every document automatically has unique 
    accountNumber: string;
    type: 'withdrawal' | 'deposit' | 'loan';
    amount: number;
    date: Date;
    interestRate?: number;      // only for loans
    paymentsCount?: number;     // only for loans
}

// Schema definition
const AccountOperationSchema = new Schema<IAccountOperation>(
    {
        accountNumber: {
            type: String,
            required: [true, "Account number is required"],
            minlength: [5, "Account number too short"],
            maxlength: [10, "Account number too long"],
            trim: true,
        },
        type: {
            type: String,
            required: [true, "Operation type is required"],
            enum: ['withdrawal', 'deposit', 'loan'],
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Amount must be positive"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        interestRate: {
            type: Number,
            required: function () { return this.type === 'loan'; },
            min: [0, "Interest rate must be positive"],
        },
        paymentsCount: {
            type: Number,
            required: function () { return this.type === 'loan'; },
            min: [1, "Payments count must be at least 1"],
        },
        
    },
    {
        versionKey: false, 
    }
);

// Export the model
export const AccountOperationModel = model<IAccountOperation>("AccountOperation", AccountOperationSchema, "AccountOperations");
