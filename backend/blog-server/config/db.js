const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',           
  password: 'sunaRin3!',           
  database: 'fakezone_db' 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados: ', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = connection;
