const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();


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
})

// updated a todo
router.put('/:id', async (req, res) => {
})

// delete a todo
router.delete('/:id', async (req, res) => {
})

module.exports = router;