const {model, Schema} = require('mongoose')
const Answer = model('Answers', new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    question: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true
}))
module.exports = Answer