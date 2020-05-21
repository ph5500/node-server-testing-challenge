const server = require('./server/server.js');
require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT;
const environment = process.env.NODE_ENV;


server.listen(port, () => {
    console.log(`\n === Server running in ${environment} mode on http://localhost:${port} === \n`.magenta.bold.underline)
})
