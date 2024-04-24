const express = require('express')
const app = express()
const sessionMiddleware = require('./src/middlewares/sessionMiddleware.js');
const { sequelize } = require('./src/helpers/connectionDB.js');
const userRouter = require('./src/routes/userRouter');
const postRouter = require('./src/routes/postRouter');
const friendRouter = require('./src/routes/friendRouter');
const emailRouter = require('./src/routes/emailRouter');
const cors = require('cors');
require('./src/models/associations.js');
require('./src/models/seedInterests.js');

app.use(sessionMiddleware);
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
}));


// Middleware pour tester si une session existe //

const checkSession = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized, no session' });
  }
};


// Routes //

app.get('/checkSession', checkSession, (req, res) => { res.json({ user_id: req.session.user_id });});
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/friend', friendRouter);
app.use('/email', emailRouter);

// Connection au server //

sequelize.sync().then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Tout fonctionne, URL du site : http://localhost:${PORT}`);
    });
  });

