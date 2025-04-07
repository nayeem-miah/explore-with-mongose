const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todosSchema = require('../schmas/todoSchmas');
// creating todo collection
const Todo = new mongoose.model("Todo", todosSchema);
// get all todo
router.get('/', async (req, res) => {
  try {
    const result = await Todo.find();
    // console.log(result);
    res.send(result)
  } catch (err) {
      console.error(err)
      res.status(500).json({
          message : "there was a server site error!"
      })
  }
})

// get a todo
router.get('/:id', async (req, res) => {
})

// post many todos in db 
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

// post a todo
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
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const updateDocument = {
      $set :{
        status : "active"
    }
  } 
  // const result = await Todo.updateOne({ _id: req.params.id }, {
  //   $set: {
  //     status: "active"
  //   }
  // })
  const result = await Todo.updateOne(filter, updateDocument)
  console.log(result);
  res.send({
    message: "update success",
    result : result
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "there was a server site error"})
  }
})

// delete a todo
router.delete('/:id', async (req, res) => {
})

module.exports = router;