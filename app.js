require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { isAuthenticated } = require('./middleware/jwt.middleware');

const projectRouter = require('./routes/project.routes');
const taskRouter = require('./routes/task.routes');
const authRouter = require('./routes/auth.routes');
const strainsRouter = require('./routes/strains.routes')
const reviewRoutes = require('./routes/review.routes')


const PORT = process.env.PORT;

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use('/auth', authRouter);
app.use('/strains', strainsRouter)
app.use('/reviews', reviewRoutes)



mongoose.connect(process.env.MONGODB_URI)
  .then(x => {
    console.log('connected to db', x.connections[0].name)
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT)
    });
  })
  .catch(err => console.log('error starting server', err))