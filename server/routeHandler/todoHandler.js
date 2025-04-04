const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todosSchema = require('../schmas/todoSchmas');
// creating todo collection
const Todo = new mongoose.model("Todo", todosSchema);
// get all todo
router.get('/', async (req, res) => {
})

// get a todo
router.get('/:id', async (req, res) => {
})

// post many todo in db 
router.post('/all', async (req, res) => {
})

// post a todo in db
router.post('/', async (req, res) => {
    const newDate = new Todo(req.body);
    const result = await newDate.save(
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "there was a server site error!"
                });
            } else {
                res.status(200).json({
                    message: "data was inserted success"
                });
            }
        }
    );
    console.log(result, "result is ");
    res.send(result)
})

// updated a todo
router.put('/:id', async (req, res) => {
})

// delete a todo
router.delete('/:id', async (req, res) => {
})

module.exports = router;