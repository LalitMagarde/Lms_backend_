const app = require('./src/app');
const connect =  require('./src/db/db');

app.listen(3000,(req,res)=>{
    console.log('server is runing on port 3000');
    connect();
})