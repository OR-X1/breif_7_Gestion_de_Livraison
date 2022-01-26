const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config({
  path: './.env'
})

const dbURI = "mongodb://127.0.0.1:27017/breif7GestiondeLivraison";
// const dbURI = "mongodb+srv://othmane:Aa112233@breif7gestiondelivraiso.8zlzc.mongodb.net/breif7GestiondeLivraison?retryWrites=true&w=majority";


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/admin', require('./routes/admin_genirale'));
app.use('/api/manager', require('./routes/manager'));
app.use('/api/responsableLivraison', require('./routes/responsableLivraison'));
app.use('/api/chauffeur', require('./routes/chauffeur'));
app.use('/api/livraisant', require('./routes/livraisant'));
app.use('/api/vehicule', require('./routes/vehicule'));



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => {
    console.log('mongodb is connected')
    console.log("Up Server : http://localhost:3000")
    }) )
  .catch(err => {
    console.log("mondb not connected");
    console.log(err)
  });


