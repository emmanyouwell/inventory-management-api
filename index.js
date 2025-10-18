require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middleware/errorMiddleware');

const product = require('./routes/products');
const tag = require('./routes/tags');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


app.use('/api', tag);
app.use('/api', product);

app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

