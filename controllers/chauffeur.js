const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const chauffeur = require("../models/chauffeur");
const livraisant = require("../models/livraisant");

const logger = require('../logger/logger');
const emailsend = require('../services/email/email')

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

        const data_login_chauffeur = await chauffeur.findOne({
            email_chauffeur: email_chauffeur,
            // password_admin: password_admin
          })

            if (!data_login_chauffeur || !(await bcrypt.compareSync(password_chauffeur, data_login_chauffeur.password_chauffeur))) {
                return res.status(200).send({
                    err: 'email or password is incorrect',
                })
            } else {
                const id = data_login_chauffeur._id;
                const name_chauffeur = data_login_chauffeur.name_chauffeur;
                const lastname_chauffeur = data_login_chauffeur.lastname_chauffeur;
                const email_chauffeur = data_login_chauffeur.email_chauffeur;
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
                res.cookie('token', token, { httpOnly: true })
                return res.status(200).send({
                    msg: "lOGIN SUCCES",
                    data_login_chauffeur: data_login_chauffeur,
                    token: token
                })
            }
    } catch (error) {
        console.log(error)
    }
}

// CRUD chauffeur -------------------------------------

exports.getAll_chauffeur = async (req, res) => {

    // const {
    //     id,
    // } = req.params

    chauffeur.find()
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

exports.create_chauffeur = async(req, res) => {
    const {
        name_chauffeur,
        lastname_chauffeur,
        email_chauffeur,
        password_chauffeur,
        passwordconfirm,
        vehicule_id,
        manager_id
    } = req.body

    // const jetonken = req.cookies.token;
    // const token = jwt.decode(jetonken)
    // const manager_id = token.id

    chauffeur.findOne({
        email_chauffeur: email_chauffeur
          })
          .then(result => {
              console.log(result);
            if (result) {
                return res.status(200).send({
                    msg: "email as ready used"
                })
            } else if (password_chauffeur !== passwordconfirm) {
                return res.status(200).send({
                    msg: "Password do not match"
                })
            }
            let hashedpassword =  bcrypt.hashSync(password_chauffeur, 10)
            console.log(hashedpassword)

            const manager = new chauffeur({
                name_chauffeur: name_chauffeur,
                lastname_chauffeur: lastname_chauffeur,
                email_chauffeur: email_chauffeur,
                password_chauffeur: hashedpassword,
                manager_id: manager_id,
                vehicule_id: vehicule_id,
              })
            
              manager.save()
                .then(result => {

                    let subj = "Your Login Info";
                    let msg = ` email : ${email_chauffeur}
                                password : ${password_chauffeur}
                        `;
                    emailsend.mail(email_chauffeur, subj, msg)


                    console.log(result);
                    return res.status(200).json({
                        msg: "Add manager",
                        result
                    })
                  })
                .catch(err => {
                  console.log(err);
                });


          })
          .catch(err => {
            console.log(err);
          });

}


exports.update_chauffeur = async(req, res) => {
    const {
        id,
        name_chauffeur,
        lastname_chauffeur,
        email_chauffeur,
        password_chauffeur,
        passwordconfirm,
        vehicule_id,
        manager_id
    } = req.body

    chauffeur.findOneAndUpdate({
        _id: id

            })
            .then(result => {
                console.log(result);
                if (result) {
                    return res.status(200).send({
                        msg: "update manager",
                        result
                    })
                } else if (password_chauffeur !== passwordconfirm) {
                    return res.status(200).send({
                        msg: "Password do not match"
                    })
                }
                let hashedpassword =  bcrypt.hashSync(password_chauffeur, 10)
                console.log(hashedpassword)

                const manager = new chauffeur({
                    name_chauffeur: name_chauffeur,
                    lastname_chauffeur: lastname_chauffeur,
                    email_chauffeur: email_chauffeur,
                    password_chauffeur: hashedpassword,
                    manager_id: manager_id,
                    vehicule_id: vehicule_id,
                    })

                manager.save()
                    
                    .then(result => {
                        console.log(result);
                        return res.status(200).json({
                            msg: "update manager",
                            result
                        })
                    }
                    )
                    .catch(err => {
                        console.log(err);
                    }
                )
            })
            .catch(err => {
                console.log(err);
            }
        )
}
