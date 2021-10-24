const User = require('../model/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET
const Question = require('../model/question.model')
const Answer = require('../model/answer.model')
exports.login = async (req, res) => {
    try {
        let {body} = req
        const admin = await User.findOne({email: body.email})
        if(admin) {
            let auth = await bcrypt.compare(body.password, admin.password)
            if(auth) {
                let token = jwt.sign({_id: admin._id}, secret, {expiresIn: '8h'})
                return res.status(200).send({
                    error: false,
                    msg: 'Login successfully',
                    token,
                    data: admin
                })
            } else {
                return res.status(200).send({
                    error: true,
                    msg: 'Invalid password'
                })
            }
        } else {
            return res.status(200).send({
                error: true,
                msg: 'User not found'
            })
        }
    } catch (e) {
        return res.status(200).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.verify = async (req, res) => {
    try {
        let {body} = req
        let decodedToken = jwt.verify(body.token, secret)
        const user = await User.findById(decodedToken._id)
        if(user) {
            return res.status(200).send({
                error: false,
                msg: 'User verify successful',
                data: user
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: 'User not found'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let {body} = req
        let admin = new User({
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
            first_name: body.first_name,
            last_name: body.last_name
        })
        let saveAdmin = await admin.save()
        if(saveAdmin){
            let token = jwt.sign({_id: saveAdmin._id}, secret, {expiresIn: '8h'})
            return res.status(200).send({
                error: false,
                msg: 'Admin added',
                token,
                data: saveAdmin
            })
        }else{
            return res.status(404).send({
                error: true,
                msg: 'Admin add failed'
            })
        }
        
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email) {
            return res.status(500).send({
                error: true,
                msg: 'User already exits'
            })
        }
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.saveData = async (req, res) => {
    try {
        let {user} = res.locals
        if(user._id){
            let {body} = req
            let data = {
                user: user._id,
                question: body
            }
            const questionAdd = new Question(data)
            const nQuestion = await questionAdd.save()
            if(nQuestion) {
                return res.status(200).send({
                    error: false,
                    msg: 'Question added successful',
                    data: nQuestion
                })
            } else {
                return res.status(404).send({
                    error: true,
                    msg: 'Question creation unsuccessful'
                })
            }
        }else{
            return res.status(404).send({
                error: true,
                msg: 'You are not authenticated'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.saveAnswer = async (req, res) => {
    try {
        let {body} = req
        const questionAdd = new Answer(body)
        const nQuestion = await questionAdd.save()
        if(nQuestion) {
            return res.status(200).send({
                error: false,
                msg: 'Answer added successful',
                data: nQuestion
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: 'Answer creation unsuccessful'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.getData = async (req, res) => {
    try {
        let {body} = req
        let data = await Question.findById(body._id)
        if(data) {
            return res.status(200).send({
                error: false,
                msg: 'Question get successful',
                data: data
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: 'Question get unsuccessful'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.getAllQuestion = async (req, res) => {
    try {
        let {user} = res.locals
        if(user._id){
            let data = await Question.find({
                user: user._id
            })
            if(data) {
                return res.status(200).send({
                    error: false,
                    msg: 'Questions get successful',
                    data: data
                })
            } else {
                return res.status(404).send({
                    error: true,
                    msg: 'Questions get unsuccessful'
                })
            }
        }else{
            return res.status(404).send({
                error: true,
                msg: 'You are not authenticated'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

exports.getAllAnswer = async (req, res) => {
    try {
        let data = await Answer.find({
            question_id: req.body._id
        })
        if(data) {
            return res.status(200).send({
                error: false,
                msg: 'Answers get successful',
                data: data
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: 'Answers get unsuccessful'
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}