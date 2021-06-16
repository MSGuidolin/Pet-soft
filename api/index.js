const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
    console.log('conexion exitosa')
    server.listen(3001, () => {
        console.log('%s lintening at 3001');
    });
});


