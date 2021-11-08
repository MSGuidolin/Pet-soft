const connection = require('./src/db');
import app from './src/app';

connection();

async function main() {
  await app.listen(app.get('port'), () => console.log('Server on port 3002'));
}
main();