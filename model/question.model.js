const {model, Schema} = require('mongoose')
const Question = model('Questions', new Schema({
    question: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true
}))
module.exports = Question