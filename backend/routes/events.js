const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/event");
const { checkAuth } = require("../util/auth");

const router = express.Router();

router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const users = await getAll();
    res.json({ users: users });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await get(req.params.id);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  try {
    await add(data);
    res.status(201).json({ message: "User saved.", user: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    await replace(req.params.id, data);
    res.json({ message: "User updated.", user: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "User deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
