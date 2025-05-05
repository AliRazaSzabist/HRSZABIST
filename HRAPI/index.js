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

app.get('/count', async (req, res) => {
    try {
        const employeesResult = await pool.query('SELECT COUNT(*) FROM employees');
        const departmentsResult = await pool.query('SELECT COUNT(*) FROM departments');
        const countriesResult = await pool.query('SELECT COUNT(*) FROM countries');

        const result = {
            employeesCount: parseInt(employeesResult.rows[0].count, 10),
            departmentsCount: parseInt(departmentsResult.rows[0].count, 10),
            countriesCount: parseInt(countriesResult.rows[0].count, 10)
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});
