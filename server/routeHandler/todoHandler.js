const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todosSchema = require('../schmas/todoSchmas');
// creating todo collection
const Todo = new mongoose.model("Todo", todosSchema);
// get all todo
router.get('/', async (req, res) => {
    const result = await Todo.find();
    console.log(result);
})

// get a todo
router.get('/:id', async (req, res) => {
})

// post many todo in db 
router.post('/all', async (req, res) => {
  try {
    const allData = req.body;
    const result = await Todo.insertMany(allData);
    res.status(200).json({
        message: "data was inserted success",
        result : result
    })
  } catch (err) {
      console.error(err)
      res.status(500).json({
        error: "There was a server-side error!"
    });
  }
})

router.post('/', async (req, res) => {
    try {
        const newDate = new Todo(req.body);
        const result = await newDate.save();
        res.status(200).json({
            message: "Data was inserted successfully",
            result: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "There was a server-side error!"
        });
    }
});


// updated a todo
router.put('/:id', async (req, res) => {
})

// delete a todo
router.delete('/:id', async (req, res) => {
})

module.exports = router;