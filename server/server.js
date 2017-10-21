const path    = require('path');    // include a built-in module
const express = require('express'); // include express

const publicPath = path.join(__dirname, '../public'); // join the elements to create a relative path
const port       = process.env.PORT || 3000;

var app = express(); // app is an express function

app.use(express.static(publicPath)); // use the app.use method()

app.listen(port, () => {
    console.log(`Server is up on por ${port}...`);
});

// console.log(publicPath);
