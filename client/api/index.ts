import app from './src/app';
import './src/db';

async function main() {
  await app.listen(app.get('port'), () => console.log('Server on port 3002'));
}
main();