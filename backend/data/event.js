const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.users) {
    throw new NotFoundError("Could not find any users.");
  }
  return storedData.users;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return user;
}

async function add(data) {
  const storedData = await readData();
  storedData.users.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    userseve;
    throw new NotFoundError("Could not find any users.");
  }

  const index = storedData.users.findIndex((user) => user.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.users[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.users.filter((user) => user.id !== id);
  await writeData({ ...storedData, users: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
