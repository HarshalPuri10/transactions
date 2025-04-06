import { hash } from "bcrypt";
import UserRepository from "../models/auth/repository/userRepository.js";
const superAdminObj = {
  _id: "65894648391fa595dd20e8d0",
  name: "Super Admin",
  email: "hp",
  password: "12",
  isActive: true,
  status: "Created",
  role: "SuperAdmin",
};
export function removeFile(destination) {
  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }
}
export function removeFilesInError(file) {
  if (file && file.length > 0) {
    for (const ele of file) {
      removeFile(ele.path);
    }
  }
}
export function removeSingleFileInError(file) {
  if (file) {
    removeFile(file.path);
  }
}
export function removeFileCreate(file) {
  if (file && file.length > 0) {
    removeFile(file[0].path);
  }
}
export function outputData(rows) {
  return {
    rows: rows[0]?.data || [],
    count: rows[0]?.metadata?.[0]?.total || 0,
  };
}
export async function insertSuperAdmin() {
  const exist = await UserRepository.findOneDoc(
    { _id: "65894648391fa595dd20e8d0" },
    { _id: 1 }
  );
  if (!exist) {
    superAdminObj.password = await hash(superAdminObj.password, 10);
    await UserRepository.createDoc(superAdminObj);
  }
}

export const getMatchData = async (project, search) => {
  let match = {};
  if (!!search) {
    match["$or"] = [];
    for (let i = 0; i < Object.keys(project).length; i++) {
      const key = Object.keys(project)[i];
      match["$or"].push({ [key]: { $regex: `${search}`, $options: "i" } });
    }
  }
  return match;
};
