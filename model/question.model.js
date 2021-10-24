const {model, Schema} = require('mongoose')
const Question = model('Questions', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    question: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true
}))
module.exports = Question