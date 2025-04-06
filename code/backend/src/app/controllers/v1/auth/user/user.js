import asyncHandler from "express-async-handler";
import { hash, genSaltSync, compare } from "bcrypt";
import MESSAGES from "../../../../helpers/messages.js";
import { outputData } from "../../../../helpers/utility.js";
import UserRepository from "../../../../models/auth/repository/userRepository.js";
export const getAll = asyncHandler(async (req, res) => {
  try {
    let project = {
      name: 1,
      email: 1,
      userType: 1,
      isActive: 1,
    };
    let rows = await UserRepository.filteredUserList([
      {
        $project: project,
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [],
        },
      },
    ]);
    return res.send({ ...outputData(rows) });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const create = asyncHandler(async (req, res) => {
  try {
    let userExists = await UserRepository.findOneDoc(
      {
        email: req.body.email.toLowerCase(),
      },
      { _id: 1 }
    );
    if (userExists) {
      let error = MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("User");
      return res.preconditionFailed(error);
    }
    req.body.password = await hash(req.body.password, 10);
    const userObj = await UserRepository.createDoc(req.body);
    if (userObj) {
      res.send({ message: MESSAGES.apiSuccessStrings.CREATE("User") });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    let existingUser = await UserRepository.findOneDoc({
      email: req.body.email,
    });
    if (existingUser && (await existingUser.matchPassword(req.body.password))) {
      return res.send({
        _id: existingUser._id,
        token: existingUser.genToken(),
        email: existingUser.email,
        role: existingUser.role,
        message: MESSAGES.apiSuccessStrings.LOGIN("User"),
      });
    } else {
      let errors = MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("User");
      return res.preconditionFailed(errors);
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
// @route   POST /api/user/
export async function update(req, res) {
  try {
    if (req.body.password) {
      req.body.password = await hash(req.body.password, genSaltSync(8));
    } else {
      delete req.body.password;
    }
    let user = await UserRepository.findAndUpdateDoc(
      { _id: req.params.id },
      req.body,
      {
        upsert: true,
        new: true,
        rawResult: true,
      }
    );
    if (!user) {
      return res.preconditionFailed(errors);
    }
    res.send({
      message: MESSAGES.apiSuccessStrings.UPDATE("User"),
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
}

export const deleteById = asyncHandler(async (req, res) => {
  try {
    const deleteItem = await UserRepository.deleteDoc(req.params.id);
    if (deleteItem) {
      return res.send({ message: MESSAGES.apiSuccessStrings.DELETE });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const getById = asyncHandler(async (req, res) => {
  try {
    let existing = await UserRepository.getDocById(req.params.id);
    if (!existing) {
      return res.unprocessableEntity(errors);
    }
    return res.send(existing);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
