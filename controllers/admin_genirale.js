const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require("../models/admin_genirale");
const Manager = require("../models/manager");

const emailsend = require('../services/email/email')

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
                err: "Please add an email and password"
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
                res.cookie('token', token, { httpOnly: true })
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

