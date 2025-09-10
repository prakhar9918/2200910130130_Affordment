const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;  
// connectDB();

app.use(express.json());
app.get('/', (req, res) => res.send('Hello I am Prakhar!'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));