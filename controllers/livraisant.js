const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const livraisant = require("../models/livraisant");
const chauffeur = require("../models/chauffeur");
const axios = require('axios');

const emailsend = require('../services/email/email')

// const emailsend = require('../controllers/email')

exports.getlivraisant = async (req, res) => {

    const {
      status,
    } = req.params

    livraisant.find({
      status: status
          })
    // Manager.find()
              .then(result => {
                return res.status(200).json({
                    msg: "fetch all data",
                    result
                })
              })
              .catch(err => {
                console.log(err);
              });
}


// CRUD livraisant -------------------------------------

exports.getAll_livraisant = async (req, res) => {

    // const {
    //     id,
    // } = req.params

    livraisant.find()
          .then(result => {
            return res.status(200).json({
                msg: "fetch all data",
                result
            })
          })
          .catch(err => {
            console.log(err);
          });
}

exports.create_livraisant = async (req, res) => {
    const {
        date_depart,
        ville_depart,
        ville_arrive,
        poids,
        // prix,
        // distance_km,
        zone
    } = req.body
    

    // distance
    const distance_km = await axios(`https://www.distance24.org/route.json?stops=${ville_depart}|${ville_arrive}`)
    .then((response) => {
        return response.data.distance

      })
      .catch((error) => {
        console.log(error)
      })

      // const prix = "0";
      let prix = 0;
      // Calcule de Montant de chaque livraison par kg
      if(zone == "maroc"){
        if (poids <= 3) {
         prix = poids * 40;
         } else if ( poids > 3) {
         //  eliminer les 3 premier cmnd
          Reste =  poids -3;
          prix = (Reste * 5) + 3*40;

         }
        }else if (zone == "europe"){
             prix = poids * 160;
        }
        else if (zone == "amerique"){
             prix = poids * 220;
        }
        else if (zone == "asie"){
              prix = poids * 240;
        }
        else if (zone == "australie"){
              prix = poids * 260;
        }

            const livraisan = new livraisant({
                date_depart: date_depart,
                ville_depart: ville_depart,
                ville_arrive: ville_arrive,
                poids: poids,
                prix: prix,
                distance_km: distance_km,
                zone: zone
              })
              console.log(livraisan);
            
              livraisan.save()
                .then(result => {

                    console.log(result);
                    return res.status(200).json({
                        msg: "livraisant added successfully",
                        result
                    })
                  })
                .catch(err => {
                  console.log(err);
                });

                // send mail to driver diponible
          var type;
          if (zone === "maroc") {
            if (poids > 800) {
              type = "grand_camion";
            } else if (poids > 200 && poids <= 800) {
              type = "petit_camion";
            } else if (poids > 0 && poids <= 200){
              type = "voiture";
            }
          } else {
            type = "avion";
          }
          // console.log("type : " + type);
          const chauffeurs = await chauffeur.find().populate("vehicule_id");
          // console.log("hiii" + chauffeurs);
          // console.log(chauffeur);
          chauffeurs.forEach((element) => {
            if (element.vehicule_id.type_vehicule === type) {
              console.log("ggggggggffff : "+element.vehicule_id.type_vehicule);

              let subj = "New order";
                  let msg = `Bonjor ${element.name_chauffeur} ${element.lastname_chauffeur} il'a une nouvelle commande entre ${ville_depart} et ${ville_arrive} a ${date_depart} poid = ${poids}`;
                  emailsend.mail(element.email_chauffeur, subj, msg)

            }else{
              console.log("------ not found --------");
            }
          });

}