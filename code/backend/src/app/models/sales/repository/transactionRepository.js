import Model from "../transactionModel.js";
const TransactionRepository = {
  createDoc: async (obj) => {
    return Model.create(obj);
  },
  insertManyDoc: async (docArr) => {
    return Model.insertMany(docArr);
  },
  findOneDoc: async (match, project = {}) => {
    return Model.findOne(match, project);
  },
  findAndUpdateDoc: async (match, update, options) => {
    return Model.updateOne(match, update, options);
  },
  getDocById: async (_id, project = {}) => {
    return Model.findById(_id, project);
  },
  updateDoc: async (existing, updateBody) => {
    Object.assign(existing, updateBody);
    return existing.save();
  },
  updateManyDoc: async (match, update) => {
    return Model.updateMany(match, update);
  },
  deleteDoc: async (id) => {
    return Model.deleteOne({ _id: id });
  },
  filteredTransList: async (pipeline) => {
    return Model.aggregate(pipeline);
  },
};
export default TransactionRepository;
