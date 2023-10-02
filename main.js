var express = require('express');
var mysql = require('mysql');
var app = express();
app.use(express.json());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classicmodel'
});

con.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected!!!");
    }
});

app.post('/claims', (req, res) => {
    const { bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method } = req.body;
    const insertQuery = `INSERT INTO claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    con.query(insertQuery, [bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Claim inserted successfully' });
        console.log(result);
    });
});

app.get('/claims', (req, res) => {
    con.query('SELECT * FROM claims', function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        if (result.length === 0) {
            // If no claims are found, send a custom message
            res.status(404).json({ message: 'No claims found' });
        } else {
            // If claims are found, send the results
            res.send(result);
            console.log(JSON.parse(JSON.stringify(result)));
        }
    });
});


app.get('/claims/:id', (req, res) => {
    const getId = req.params.id;   // Get the ID from the URL parameter
    con.query('SELECT * FROM claims where id=?', getId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (result.length === 0) {
            // If no matching claim was found, return a 404 Not Found response
            res.status(404).json({ error: 'Claim not found' });
            return;
        }

        // Return the first (and presumably only) result
        //   res.json(`The id ${result[0].id} has customerId ${result[0].customer_id}`);  //ew can Access the values like this

        res.send(JSON.parse(JSON.stringify(result)));      //we can get in the form of json
        console.log(JSON.parse(JSON.stringify(result)));
    });
});

app.put('/claims/:id', (req, res) => {
    const claimId = req.params.id;      // Get the ID from the URL parameter
    const updatedData = req.body;       // Get the updated data from the request body    
    const updateQuery = `UPDATE claims SET ? WHERE id = ?`;
    con.query(updateQuery, [updatedData, claimId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, it means no matching claim was found
            res.status(404).json({ error: 'Claim not found' });
            return;
        }
        res.status(200).json({ message: 'Claim updated successfully' });
        console.log(result);
    })
})

app.delete('/claims', (req, res) => {
    const deleteQuery = 'DELETE FROM claims';
    con.query(deleteQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'All claims deleted successfully' });
    });
});

app.delete('/claims/:id', (req, res) => {
    const claimId = req.params.id; // Get the ID from the URL parameter
    const deleteQuery = 'DELETE FROM claims WHERE id = ?';
    con.query(deleteQuery, [claimId], (err, result) => {
        if (err) {
            console.error(err);
            res.statusMessage(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning no matching claim was found
            res.status(404).json({ error: 'Claim not found' });
            return;
        }

        res.status(200).json({ message: 'Claim deleted successfully' });
        console.log(result);
    })
});


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

