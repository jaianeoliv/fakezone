const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sunaRin3!",
    database: "fakezone_db",
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
    connection.release(); 
});

module.exports = pool;
 
