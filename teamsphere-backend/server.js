require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
