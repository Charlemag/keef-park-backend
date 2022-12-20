require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { isAuthenticated } = require('./middleware/jwt.middleware');
//Protects routes

//const projectRouter = require('./routes/project.routes');
//const taskRouter = require('./routes/task.routes');
const authRouter = require('./routes/auth.routes');
const strainsRouter = require('./routes/strains.routes')
const reviewRouter = require('./routes/review.routes')
const userRouter = require('./routes/User.routes')

const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json())


app.use('/strains', isAuthenticated, strainsRouter)
app.use('/reviews', isAuthenticated, reviewRouter)
app.use('/user', userRouter);
app.use('/auth', authRouter);



mongoose.connect(process.env.MONGODB_URI)
  .then(x => {
    console.log('connected to db', x.connections[0].name)
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT)
    });
  })
  .catch(err => console.log('error starting server', err))