const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const connection = require("./db");
connection();

const { checkVotedStatus }= require('./middleware/CheckVoteState');
const cookieParser = require('cookie-parser');
// Routes

const postalCodeRoute = require('./routes/laposteRoute');
const loginRouter = require('./routes/userLogin');
const registerRouter = require('./routes/register');
const adminLogin = require('./routes/admin_login');
const AddCandidat = require('./routes/addCandidat');
const MakeVote = require('./routes/VoteRoute');
const GetCandidat = require('./routes/getCandidat');
const verifyToken = require('./middleware/verify_token');
const verifyAdminToken = require('./middleware/verifyAdmin');

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// db 


//path

app.use('/code', postalCodeRoute);
app.use('/login',loginRouter);
app.use('/register',verifyAdminToken,registerRouter);
app.use('/api/admin/login',adminLogin);
app.use('/api/add/candidat',verifyAdminToken,AddCandidat);
app.use('/api/get/candidat',GetCandidat);
app.use('/vote',verifyToken,MakeVote);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
