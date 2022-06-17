const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
var cors = require('cors')



dotenv.config({
  path: './.env'
})

const dbURI = "mongodb://localhost:27017/qr_resto";
// const dbURI = "mongodb+srv://othmane:Aa112233@breif7gestiondelivraiso.8zlzc.mongodb.net/breif7GestiondeLivraison?retryWrites=true&w=majority";

app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:5000/'],
//   credentials: true,
//   methods: ['GET', 'POST', 'DELETE', 'PATCH']
// }));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())


app.use('/api/admin', require('./routes/admin_genirale'));

app.use('/api/chauffeur', require('./routes/chauffeur'));

app.use('/api/logout', require('./routes/logout'));



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => {
    console.log('mongodb is connected')
    console.log("Up Server : http://localhost:3000")
    }) )
  .catch(err => {
    console.log("mondb not connected");
    console.log(err)
  });


