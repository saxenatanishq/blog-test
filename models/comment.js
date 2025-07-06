const {model, Schema} =  require("mongoose");

const CommentSchema = new Schema({
    content : {
        type : String,
        require:  true,
    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref : "user",
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : "blog",
    }
}, {timestamps : true});

const comment = model("comment", CommentSchema);

module.exports = comment;