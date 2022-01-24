const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Manager = require("../models/manager");
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
            email_manager,
            password_manager
        } = req.body
        console.log(req.body)
        if (!email_manager || !password_manager) {
            return res.status(200).send({
                msg: "Please add an email and password"
            })
        }

        const login_manager = await Manager.findOne({
            email_manager: email_manager,
            // password_admin: password_admin
          })

            if (!login_manager || !(await bcrypt.compareSync(password_manager, login_manager.password_manager))) {
                return res.status(200).send({
                    err: 'email or password is incorrect',
                })
            } else {
                const id = login_manager._id;
                const name_manager = login_manager.name_manager;
                const lastname_manager = login_manager.lastname_manager;
                const email_manager = login_manager.email_manager;
                const role = "manager";
                const token = jwt.sign({
                    id,
                    name_manager,
                    lastname_manager,
                    email_manager,
                    role
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN
                })
                return res.status(200).send({
                    msg: "lOGIN SUCCES",
                    data_login_manager: login_manager,
                    token: token
                })
            }
    } catch (error) {
        console.log(error)
    }
}


// CRUD responsable Livraison -------------------------------------

exports.getAll_responsableLivraison = async (req, res) => {

    const {
        id,
    } = req.params

    responsableLivraison.findOne({
        _id: id
          })
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

exports.create_responsableLivraison = (req, res) => {
    const {
        name_responsableL,
        lastname_responsableL,
        email_responsableL,
        password_responsableL,
        passwordconfirm
    } = req.body

    responsableLivraison.findOne({
        email_responsableL: email_responsableL
          })
          .then(result => {
              console.log(result);
            if (result) {
                return res.status(200).send({
                    msg: "email as ready used"
                })
            } else if (password_responsableL !== passwordconfirm) {
                return res.status(200).send({
                    msg: "Password do not match"
                })
            }
            let hashedpassword =  bcrypt.hashSync(password_responsableL, 10)
            console.log(hashedpassword)

            const manager = new responsableLivraison({
                name_responsableL: name_responsableL,
                lastname_responsableL: lastname_responsableL,
                email_responsableL: email_responsableL,
                password_responsableL: hashedpassword
              })
            
              manager.save()
                .then(result => {

                    let subj = "Your Login Info";
                    let msg = ` email : ${email_responsableL}
                                password : ${password_responsableL}
                        `;
                    emailsend.mail(email_responsableL, subj, msg)


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




// CRUD responsable Livraison -------------------------------------

exports.getAll_chauffeur = async (req, res) => {

    const {
        id,
    } = req.params

    chauffeur.findOne({
        _id: id
          })
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

exports.create_chauffeur = (req, res) => {
    const {
        name_chauffeur,
        lastname_chauffeur,
        email_chauffeur,
        password_chauffeur,
        passwordconfirm
    } = req.body

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
                password_chauffeur: hashedpassword
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


// CRUD responsable Livraison -------------------------------------

exports.getAll_vehicule = async (req, res) => {

    const {
        id,
    } = req.params

    chauffeur.findOne({
        _id: id
          })
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
        name_chauffeur,
        lastname_chauffeur,
        email_chauffeur,
        password_chauffeur,
        passwordconfirm
    } = req.body

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
                password_chauffeur: hashedpassword
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