const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const chauffeur = require("../models/chauffeur");

const emailsend = require('../controllers/email')

exports.getchauffeur = async (req, res) => {

    const {
        id,
    } = req.params

    chauffeur.findOne({
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

exports.login = async (req, res) => {
    try {
        const {
            email_chauffeur,
            password_chauffeur
        } = req.body
        console.log(req.body)
        if (!email_chauffeur || !password_chauffeur) {
            return res.status(200).send({
                msg: "Please add an email and password"
            })
        }

        const login_responsableL = await chauffeur.findOne({
            email_chauffeur: email_chauffeur,
            // password_admin: password_admin
          })

            if (!login_responsableL || !(await bcrypt.compareSync(password_chauffeur, login_responsableL.password_chauffeur))) {
                return res.status(200).send({
                    err: 'email or password is incorrect',
                })
            } else {
                const id = login_responsableL._id;
                const name_chauffeur = login_responsableL.name_chauffeur;
                const lastname_chauffeur = login_responsableL.lastname_chauffeur;
                const email_chauffeur = login_responsableL.email_chauffeur;
                const role = "chauffeur";
                const token = jwt.sign({
                    id,
                    name_chauffeur,
                    lastname_chauffeur,
                    email_chauffeur,
                    role
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN
                })
                return res.status(200).send({
                    msg: "lOGIN SUCCES",
                    data_login_manager: login_responsableL,
                    token: token
                })
            }
    } catch (error) {
        console.log(error)
    }
}

