const express = require('express')
const app = express();
const mongoose = require('mongoose');
const admin = require('./models/admin_genirale');
const manager = require('./models/manager');

// const dbURI = "mongodb+srv://othmane:Aa112233@breif7gestiondelivraiso.8zlzc.mongodb.net/breif7GestiondeLivraison";
const dbURI = "mongodb://127.0.0.1:27017/breif7GestiondeLivraison";
// const dbURI = "mongodb+srv://othmane:Aa112233@breif7gestiondelivraiso.8zlzc.mongodb.net/breif7GestiondeLivraison?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => {
    console.log('mongodb is connected')
    console.log("Up Server : http://localhost:3000")
    }) )
  .catch(err => {
    console.log("mondb not connected");
    console.log(err)
  });



// app.use('/api/admin', adminG);
// app.use('/api/manager',manager);
// app.use('/api/responsableLivraison', ResLivraison);
// app.use('/api/chauffeur', chauffeur);
// app.use('/api/livraisant', camion);
// app.use('/api/commande', commande);
// app.use('/api/prime', prime);

//define routes
// app.use('/auth/generaladmin', require('./routes/admin_genaral/generaladmin_auth'));

// app.listen(3000, () => {
//     console.log("Up Server")
// })

