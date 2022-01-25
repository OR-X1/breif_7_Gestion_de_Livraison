const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const Manager = require("../models/manager");
const responsableLivraison = require("../models/responsableLivraison");

const emailsend = require('../services/email/email')

exports.getresponsableLivraison = async (req, res) => {

    const {
        id,
    } = req.params

    responsableLivraison.findOne({
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
                res.cookie('token', token, { httpOnly: true })
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





// CRUD responsable Livraison -------------------------------------

exports.getAll_responsableLivraison = async (req, res) => {

    // const {
    //     id,
    // } = req.params

    responsableLivraison.find()
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