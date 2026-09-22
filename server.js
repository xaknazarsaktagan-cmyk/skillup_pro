const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// SQLite деректер базасына қосылу
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Базаға қосылу қатесі:', err.message);
    } else {
        console.log('SQLite деректер базасына сәтті қосылды.');
    }
});

// Кесте жасау және мәлімет қосу
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`, (err) => {
    if (!err) {
        db.run(`INSERT OR IGNORE INTO users (id, name) VALUES (1, 'Aruzhan')`);
    }
});

// API арқылы деректерді алу
app.get('/api/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Деректер базасынан сәтті алынды!",
            users: rows
        });
    });
});


app.use(express.static(__dirname));
app.listen(PORT, () => {
    console.log(`Сервер жұмыс істеп тұр: http://localhost:${PORT}`);
});