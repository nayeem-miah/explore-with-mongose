const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todosSchema = require('../schmas/todoSchmas');
const verifyLogin = require("../middlewares/verifyLogin");
const userSchema = require("../schmas/userSchma");
// creating users model
const User = new mongoose.model("user", userSchema);
// creating todo collection
const Todo = new mongoose.model("Todo", todosSchema);
// get all todo
router.get('/', verifyLogin, async (req, res) => {
  // console.log(req.email, req.userID);
  try {
    // const filter = { status: "inactive" }; //filter by status
    const filter = {}
    // select, limit and sort() use
    const result = await Todo.find({})
      .populate("user", "name  email -_id")  // just show user and email -----> -_id remove 
      .select({
      _id : 0
      }).limit(3)
      .sort({ date: -1 });
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

// get active todos with instance method
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

// statics method
router.get("/js-data", async (req, res) => {
  try {
    const result = await Todo.findByJS();
    console.log(result);
    res.status(200).json({
      data : result
    })
    } catch (error) {
      console.error(error)
      res.status(500).json({message : "there is server side error"})
    }
})

// query helpers
router.get('/language/:qu', async (req, res) => {
  const qu = req.params.qu;
  // const query = req.body;
  // console.log(query, "query", qu);
  const result = await Todo.find().byLanguage(qu);
  res.status(200).json({
    data : result
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
router.post('/',verifyLogin, async(req, res) => {
    try {
      const newDate = new Todo({
        ...req.body,
        user: req.userID,
      });
      // console.log(newDate);
      const result = await newDate.save();
      await User.updateOne({
        _id : req.userID
      }, {
        $push: {
          todos : result._id
        }
      }
      )
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