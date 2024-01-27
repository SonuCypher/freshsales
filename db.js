const mysql = require('mysql2/promise')



const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'102752',
    database:'onitodb'
})

mysqlPool.query("SELECT * FROM tickets WHERE id = ?;",[1])
.then(data => console.log(data))
.catch(err => console.error(err))