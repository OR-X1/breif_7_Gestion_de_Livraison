const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require("../models/admin_genirale");
const Manager = require("../models/manager");

const emailsend = require('../controllers/email')

exports.getAdmin = async (req, res) => {

        Admin.find()
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
            email_admin,
            password_admin
        } = req.body
        console.log(req.body)
        if (!email_admin || !password_admin) {
            return res.status(200).send({
                msg: "Please add an email and password"
            })
        }

        const login_admin = await Admin.findOne({
            email_admin: email_admin,
            // password_admin: password_admin
          })

            if (!login_admin || !(await bcrypt.compareSync(password_admin, login_admin.password_admin))) {
                return res.status(200).send({
                    err: 'email or password is incorrect',
                })
            } else {
                const id = login_admin._id;
                const name_admin = login_admin.name_admin;
                const lastname_admin = login_admin.lastname_admin;
                const email_admin = login_admin.email_admin;
                const role = "admin";
                const token = jwt.sign({
                    id,
                    name_admin,
                    lastname_admin,
                    email_admin,
                    role
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN
                })
                return res.status(200).send({
                    msg: "lOGIN SUCCES",
                    data_login_admin: login_admin,
                    token: token
                })
            }
    } catch (error) {
        console.log(error)
    }
}


// CRUD manager -------------------------------------

exports.getAll_managers = async (req, res) => {

    Manager.find()
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

exports.create_manager = (req, res) => {
    const {
        name_manager,
        lastname_manager,
        email_manager,
        password_manager,
        passwordconfirm
    } = req.body

    Manager.findOne({
        email_manager: email_manager
          })
          .then(result => {
              console.log(result);
            if (result) {
                return res.status(200).send({
                    msg: "email as ready used"
                })
            } else if (password_manager !== passwordconfirm) {
                return res.status(200).send({
                    msg: "Password do not match"
                })
            }
            let hashedpassword =  bcrypt.hashSync(password_manager, 10)
            console.log(hashedpassword)

            const manager = new Manager({
                name_manager: name_manager,
                lastname_manager: lastname_manager,
                email_manager: email_manager,
                password_manager: hashedpassword
              })
            
              manager.save()
                .then(result => {

                    let subj = "Your Login Info";
                    let msg = ` email : ${email_manager}
                                password : ${password_manager}
                        `;
                    emailsend.mail(email_manager, subj, msg)


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