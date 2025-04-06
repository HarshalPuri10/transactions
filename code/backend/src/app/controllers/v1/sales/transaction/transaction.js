import asyncHandler from "express-async-handler";
import MESSAGES from "../../../../helpers/messages.js";
import TransactionRepository from "../../../../models/sales/repository/transactionRepository.js";
import { getMatchData, outputData } from "../../../../helpers/utility.js";
import mongoose from "mongoose";

export default {
  getAll: asyncHandler(async (req, res) => {
    try {
      const {
        search = null,
        page = 1,
        pageSize = 10,
        column = "createdAt",
        direction = -1,
        userId = null,
      } = req.query;
      let project = {
        title: 1,
        amount: 1,
        type: 1,
        category: 1,
        date: 1,
      };
      let skip = Math.max(0, +page - 1) * +pageSize;
      let match = await getMatchData(project, search);
      let pagination = [{ $skip: +skip }, { $limit: +pageSize }];

      let rows = await TransactionRepository.filteredTransList([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        { $project: project },
        { $match: match },
        { $sort: { [column]: +direction } },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: pagination,
          },
        },
      ]);
      return res.send({ ...outputData(rows) });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),
  getDashboard: asyncHandler(async (req, res) => {
    try {
      let rows = await TransactionRepository.filteredTransList([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(req.query.userId),
          },
        },
        {
          $group: {
            _id: null,
            profit: {
              $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
            },
            loss: {
              $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
            },
          },
        },
      ]);
      return res.send(rows?.length ? rows[0] : null);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),

  create: asyncHandler(async (req, res) => {
    try {
      const saveObj = await TransactionRepository.createDoc(req.body);
      return res.send({
        message: MESSAGES.apiSuccessStrings.CREATE("Transaction"),
      });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),
  update: asyncHandler(async (req, res) => {
    try {
      const updateObj = await TransactionRepository.findAndUpdateDoc(
        { _id: req.params.id },
        req.body,
        {
          upsert: true,
          new: true,
          rawResult: true,
        }
      );
      if (!updateObj) {
        return res.preconditionFailed(errors);
      }
      return res.send({
        message: MESSAGES.apiSuccessStrings.UPDATE("Transaction"),
      });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),
  deleteById: asyncHandler(async (req, res) => {
    try {
      const deleteItem = await TransactionRepository.deleteDoc(req.params.id);
      return res.send({ message: MESSAGES.apiSuccessStrings.DELETE });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),
  getById: asyncHandler(async (req, res) => {
    try {
      let existing = await TransactionRepository.getDocById(req.params.id);
      if (!existing) {
        return res.unprocessableEntity(errors);
      }
      return res.send(existing);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500).send({ error: "Internal Server Error" });
    }
  }),
};
