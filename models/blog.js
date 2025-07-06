const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        required:  true,
    },
    content : {
        type : String,
        required : true,
    },
    coverImage : {
        type : String,
    },
    createBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
}, {timestamps : true});

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;