const express = require("express");
const testRouter = express.Router();
const Test = require("../models/test.js");
/*************************************** */
testRouter.get("/:name/:number", async (req, res) => {
  const test = await Test.findOne({
    $and: [{ name: req.params.name }, { number: req.params.number }],
  });
  if (test) {
    return res.send(test);
  } else {
    return res.status(404).send({ msg: "not found" });
  }
});
/*************************************** */
testRouter.get("/findAll", async (req, res) => {
  try {
    const testArray = await Test.find().sort({ createdAt: -1 });
    res.status(200).send(testArray);
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
/************************************* */
testRouter.post("/senduser", async (req, res) => {
  try {
    const { test, number } = req.body;
    const newtest = await Test.create({ name: test, number: number });
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
testRouter.put("/update", async (req, res) => {
  const updatedTest = await Test.updateMany(
    { name: "test123" },
    { number: 2020, name: "test" }
  );
  return res.send(updatedTest);
});
 testRouter.delete("/delete", async(req,res)=>{
  const deleteTest = await Test.deleteMany({name:"test"})
  res.status(200).send(deleteTest)
 })
module.exports = testRouter;
