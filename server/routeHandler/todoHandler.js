const express = require("express");
const router = express.Router();
const todosSchema = require('./schmas/todoSchmas');
const  mongoose = require("mongoose");

const Todo = new mongoose.model("todo", todosSchema)

// get all the todos 
router.get('/', async (req, res) => {
    
})

// GET A TODO BY ID
router.get('/:id', async (req, res) => {
    
})

// POST TODO
router.post("/all", async (req, res) => {
    
})

// put todo
router.put('/:id', async (req, res) => {
    
})

// delete todo
router.delete('/:id', async (req, res) => {
    
})

module.exports = router;