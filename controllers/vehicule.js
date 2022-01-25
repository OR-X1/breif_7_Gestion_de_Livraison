const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const vehicule = require("../models/vehicule");


exports.getvehicule = async (req, res) => {

    const {
        id,
    } = req.params

    vehicule.findOne({
        _id: id
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





// CRUD chauffeur -------------------------------------

exports.getAll_vehicule = async (req, res) => {


    vehicule.find()
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

exports.create_vehicule = (req, res) => {
    const {
      name_vehicule,
      type_vehicule,
      matricule
    } = req.body

    vehicule({
      name_vehicule: name_vehicule,
      type_vehicule: type_vehicule,
      matricule: matricule
    }).save()
      .then(result => {
          console.log(result);
          return res.status(200).json({
              msg: "Add vehicule",
              result
          })
        })
      .catch(err => {
        console.log(err);
      });

}