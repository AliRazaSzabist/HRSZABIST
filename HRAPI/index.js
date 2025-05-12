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


app.get('/', async (req, res) => {
    try {
        res.json({ message: "Welcome to HR SZABIST." });
    }
    catch (err) {
        res.status(500).json({ Error: err.message })
    }

});

app.get('/emp', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows)
    }
    catch (err) {
        res.status(500).json({ Error: err.message })
    }

});

app.get('/empcount', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM employees');
        res.json(result.rows)
    }
    catch (err) {
        res.status(500).json({ Error: err.message })
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

app.get('/country', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * from countries`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//query40
app.get('/query40', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, l.city, l.state_province, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query41
app.get('/query41', async (req, res) => {
    try {
        const result = await pool.query(`SELECT *  
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query42
app.get('/query42', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT e.*, jh.job_id, jh.start_date, jh.end_date 
            FROM employees e 
            JOIN job_history jh ON e.employee_id = jh.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query43
app.get('/query43', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.*, jh.*, d.department_name 
            FROM employees e 
            JOIN job_history jh ON e.employee_id = jh.employee_id 
            JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query44
app.get('/query44', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.*, jh.*, d.department_name, l.city, l.state_province 
            FROM employees e 
            JOIN job_history jh ON e.employee_id = jh.employee_id 
            JOIN departments d ON jh.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query45
app.get('/query45', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.*, jh.*, c.country_name 
            FROM employees e 
            JOIN job_history jh ON e.employee_id = jh.employee_id 
            JOIN departments d ON jh.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query46
app.get('/query46', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, d.department_name 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query47
app.get('/query47', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, j.job_title 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query48
app.get('/query48', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, j.job_title, d.department_name 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id 
            JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query49
app.get('/query49', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, j.job_title, l.city, l.state_province 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id 
            JOIN departments d ON jh.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query50
app.get('/query50', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, j.job_title, c.country_name 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id 
            JOIN departments d ON jh.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query51
app.get('/query51', async (req, res) => {
    try {
        const result = await pool.query(`SELECT r.region_name, c.country_name, l.city 
            FROM regions r 
            JOIN countries c ON r.region_id = c.region_id 
            JOIN locations l ON c.country_id = l.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query52
app.get('/query52', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, r.region_name, l.city 
            FROM countries c 
            JOIN regions r ON c.region_id = r.region_id 
            JOIN locations l ON c.country_id = l.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query53
app.get('/query53', async (req, res) => {
    try {
        const result = await pool.query(`SELECT l.city, c.country_name, r.region_name 
            FROM locations l 
            JOIN countries c ON l.country_id = c.country_id 
            JOIN regions r ON c.region_id = r.region_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query54
app.get('/query54', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name, e.first_name, e.last_name, l.city FROM departments d JOIN employees e ON d.department_id = e.department_id JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query55
app.get('/query55', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name 
            FROM employees e 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query56
app.get('/query56', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, m.first_name AS manager_first_name, 
            m.last_name AS manager_last_name, d.department_name, l.city 
            FROM employees e 
            LEFT JOIN employees m ON e.manager_id = m.employee_id 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query57
app.get('/query57', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query58
app.get('/query58', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title, d.department_name, 
            m.first_name AS manager_first_name, m.last_name AS manager_last_name 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            JOIN departments d ON e.department_id = d.department_id 
            LEFT JOIN employees m ON e.manager_id = m.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query59
app.get('/query59', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title, d.department_name, 
            m.first_name AS manager_first_name, m.last_name AS manager_last_name, l.city 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            LEFT JOIN employees m ON e.manager_id = m.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query60
app.get('/query60', async (req, res) => {
    try {
        const result = await pool.query(`SELECT country_name FROM countries WHERE region_id = 1;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//query61
app.get('/query61', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name 
            FROM departments d 
            JOIN locations l ON d.location_id = l.location_id 
            WHERE l.city LIKE 'N%';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query62
app.get('/query62', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name 
            FROM employees e 
            WHERE e.department_id IN ( 
                SELECT d.department_id 
                FROM departments d 
                JOIN employees m ON d.manager_id = m.employee_id 
                WHERE m.commission_pct > 0.15 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query63
app.get('/query63', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT j.job_title 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            WHERE e.employee_id IN (
                SELECT DISTINCT manager_id 
                FROM employees 
                WHERE manager_id IS NOT NULL
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query64
app.get('/query64', async (req, res) => {
    try {
        const result = await pool.query(`SELECT l.postal_code 
            FROM locations l 
            JOIN countries c ON l.country_id = c.country_id 
            JOIN regions r ON c.region_id = r.region_id 
            WHERE r.region_name = 'Asia';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query65
app.get('/query65', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT d.department_name 
            FROM departments d 
            JOIN employees e ON d.department_id = e.department_id 
            WHERE e.commission_pct IS NOT NULL AND e.commission_pct < ( 
                SELECT AVG(commission_pct) 
                FROM employees 
                WHERE commission_pct IS NOT NULL 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query66
app.get('/query66', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            WHERE e.salary > ( 
                SELECT AVG(e2.salary) 
                FROM employees e2 
                WHERE e2.department_id = e.department_id 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query67
app.get('/query67', async (req, res) => {
    try {
        const result = await pool.query(`SELECT employee_id 
            FROM employees 
            WHERE department_id IS NULL;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query68
app.get('/query68', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name 
            FROM employees e 
            WHERE e.employee_id IN ( 
                SELECT employee_id 
                FROM job_history 
                GROUP BY employee_id 
                HAVING COUNT(*) > 1 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query69
app.get('/query69', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, COUNT(*) AS employee_count 
            FROM employees 
            GROUP BY department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query70
app.get('/query70', async (req, res) => {
    try {
        const result = await pool.query(`SELECT job_id, SUM(salary) AS total_salary 
            FROM employees 
            GROUP BY job_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//query71
app.get('/query71', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, AVG(commission_pct) AS avg_commission 
            FROM employees 
            WHERE commission_pct IS NOT NULL 
            GROUP BY department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query72
app.get('/query72', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, MAX(e.salary) AS max_salary 
            FROM employees e 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id 
            GROUP BY c.country_name;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query73
app.get('/query73', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, d.department_name, e.first_name || ' ' || e.last_name AS full_name, jh.start_date 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id 
            JOIN departments d ON jh.department_id = d.department_id 
            WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query74
app.get('/query74', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, l.city, COUNT(DISTINCT d.department_id) AS dept_count 
            FROM departments d 
            JOIN employees e ON d.department_id = e.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id 
            GROUP BY c.country_name, l.city 
            HAVING COUNT(e.employee_id) >= 2;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query75
app.get('/query75', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS full_name, j.job_title, jh.start_date, jh.end_date 
            FROM job_history jh 
            JOIN employees e ON jh.employee_id = e.employee_id 
            JOIN jobs j ON jh.job_id = j.job_id 
            WHERE e.commission_pct IS NULL 
            AND (jh.start_date, jh.end_date) IN ( 
                SELECT MAX(start_date), MAX(end_date) 
                FROM job_history 
                GROUP BY employee_id 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query76
app.get('/query76', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS full_name, e.employee_id, c.country_name 
            FROM employees e 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query77
app.get('/query77', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.salary, e.department_id 
            FROM employees e 
            WHERE salary IN ( 
                SELECT MIN(salary) 
                FROM employees 
                GROUP BY department_id 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query78
app.get('/query78', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * 
            FROM employees 
            WHERE salary = ( 
                SELECT DISTINCT salary 
                FROM employees 
                ORDER BY salary DESC 
                OFFSET 2 LIMIT 1 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query79
app.get('/query79', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name || ' ' || e.last_name AS name, e.salary 
            FROM employees e 
            WHERE e.salary > ( 
                SELECT AVG(e2.salary) 
                FROM employees e2 
                WHERE e2.department_id = e.department_id 
            ) 
            AND e.department_id IN ( 
                SELECT DISTINCT department_id 
                FROM employees 
                WHERE first_name ILIKE '%J%' OR last_name ILIKE '%J%' 
            );`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//query80
app.get('/query80', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS name, e.employee_id, j.job_title 
            FROM employees e 
            JOIN jobs j ON e.job_id = j.job_id 
            JOIN departments d ON e.department_id = d.department_id 
            JOIN locations l ON d.location_id = l.location_id 
            WHERE l.city = 'Toronto';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
