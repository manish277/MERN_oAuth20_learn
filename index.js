const express = require('express');
const app = express();
const mongoose=require('mongoose');
const keys=require('./config/keys')
const cookieSession=require('cookie-session')
const passport=require('passport')
const PORT = process.env.PORT || 3000
require('./models/User')
require('./services/passport')
mongoose.connect(keys.mongoURI,()=>{
  console.log('Connected to MongoDB');
})

app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoute')(app);



app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
})