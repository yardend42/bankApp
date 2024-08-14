import { AccountOperationModel, IAccountOperation } from "../models/accountMongoDB";
import { ClientError } from "../models/ClientsErrors";

const addOperation = (newOperation: IAccountOperation): Promise<IAccountOperation> => {
    const errors = newOperation.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    return newOperation.save();
}

const getAllOperations = async (accountNumber: string): Promise<IAccountOperation[]> => {
    return AccountOperationModel.find({ accountNumber }).exec();
}

export{
    addOperation,
    getAllOperations
}