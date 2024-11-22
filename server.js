require('dotenv').config();
const express = require('express');
const path = require('path');
const errorHandler = require('./src/middleware/errorHandler');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors({
//     origin: process.env.ALLOWED_ORIGINS.split(','),
//     credentials: true
// }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});