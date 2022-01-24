const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const Manager = require("../models/manager");
const responsableLivraison = require("../models/responsableLivraison");
const chauffeur = require("../models/chauffeur");

const emailsend = require('../controllers/email')

exports.getmanager = async (req, res) => {

    const {
        id,
    } = req.params

    Manager.findOne({
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
            email_responsableL,
            password_responsableL
        } = req.body
        console.log(req.body)
        if (!email_responsableL || !password_responsableL) {
            return res.status(200).send({
                msg: "Please add an email and password"
            })
        }

        const login_responsableL = await responsableLivraison.findOne({
            email_responsableL: email_responsableL,
            // password_admin: password_admin
          })

            if (!login_responsableL || !(await bcrypt.compareSync(password_responsableL, login_responsableL.password_responsableL))) {
                return res.status(200).send({
                    err: 'email or password is incorrect',
                })
            } else {
                const id = login_responsableL._id;
                const name_responsableL = login_responsableL.name_responsableL;
                const lastname_responsableL = login_responsableL.lastname_responsableL;
                const email_responsableL = login_responsableL.email_responsableL;
                const role = "responsableLivraison";
                const token = jwt.sign({
                    id,
                    name_responsableL,
                    lastname_responsableL,
                    email_responsableL,
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

