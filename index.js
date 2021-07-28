import app from './app'; 
import env from './config/env';

app.listen(env.PORT, () => {
    console.log(`Running on port ${env.PORT}...`);
});

export default app;

console.log('Executing Server: index.js ...');
console.log('');