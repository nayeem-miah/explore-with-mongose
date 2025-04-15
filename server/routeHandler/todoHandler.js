const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todosSchema = require('../schmas/todoSchmas');
// creating todo collection
const Todo = new mongoose.model("Todo", todosSchema);
// get all todo
router.get('/', async (req, res) => {
  try {
    const filter = { status: "inactive" }; //filter by status
    // select, limit and sort() use
    const result = await Todo.find(filter).select({
      _id : 0
    }).limit(3).sort({date : -1});
    // console.log(result);
    // res.send(result);
    res.status(200).json({
      message: "get all toto success",
      result : result
    })
  } catch (err) {
      console.error(err)
      res.status(500).json({
          message : "there was a server site error!"
      })
  }
})

// get active todos
router.get("/active", async (req, res) => {
    try {
      const todo = new Todo();
      const result = await todo.findActive();
      res.status(200).json({
        result : result
      })
    } catch (error) {
      console.error(error)
    }
})

// get find all using with callback
// ❌ Old way (invalid in Mongoose v7+)
router.get('/callback-all', (req, res) => {
  const todo = new Todo();
  todo.findACallback((err, result) => {
    res.status(200).json({
      result : result
    })
  })
})

// get a todo
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter ={_id : id}
    const result = await Todo.findOne(filter)
    res.status(200).json({
      result : result
    })
    
  } catch (err) {
      console.error(err)
      res.status(500).json({
          message : "there was a server site error!"
      })
  }
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
    // findByIdAndUpdate() -------> find one and update after data
  const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
    $set: {
      status: "active"
    }
  }, {
    new : true, // updated data parwer jonno
    userFindAndModify: false
  })
    // updateOne() --------> find and update
  // const result = await Todo.updateOne(filter, updateDocument)
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
  try {
    const id = req.params.id;
    const filter = {_id : id}
    const result = await Todo.deleteOne(filter)
    console.log(result);
    res.status(200).json({
      message: "delete success",
      result: result
    }
    )
    
  } catch (error) {
    console.error(error)
    res.status(500).json({message : "there was server site error"})
    
  }
})

module.exports = router;