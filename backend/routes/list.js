const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");
const { response } = require("express");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { todoList, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ todoList, user: existingUser });
      await list.save().then(() => {
        res.status(200).json({ list });
      });

      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log("error in adding -->", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//update
router.post("/updateTask/:id", async (req, res) => {
  try {
    const { todoList } = req.body;
    await List.findByIdAndUpdate(req.params.id, { todoList });
    //   List.save();
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in updating -->", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//deletee
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      //   List.save();
      return res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.log("error in deleting -->", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//getTask
//getTask
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ list: list });
  } catch (error) {
    console.log("error in getting tasks -->", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
