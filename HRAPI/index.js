const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.get('/', async(req, res) => {
    try{
        res.json({message: "Welcome to HR SZABIST."});
    }
    catch(err){
        res.status(500).json({Error : err.message})
    }
    
});

app.get('/emp', async(req, res) => {
    try{
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows)
    }
    catch(err){
        res.status(500).json({Error : err.message})
    }
    
});

app.get('/empcount', async(req, res) => {
    try{
        const result = await pool.query('SELECT COUNT(*) FROM employees');
        res.json(result.rows)
    }
    catch(err){
        res.status(500).json({Error : err.message})
    }
    
});

app.get('/count', async(req, res) => {
    try{
        let employeescount = await pool.query('SELECT COUNT() FROM employees');
        const departmentscount = await pool.query('SELECT COUNT() FROM departments');
        const countriescount = await pool.query('SELECT COUNT() FROM countries');
        const result = {
            employeescount,
            departmentscount,
            countriescount
        }
        res.json(result.rows)
    }
    catch(err){
        res.status(500).json({Error : err.message})
    }
    
});