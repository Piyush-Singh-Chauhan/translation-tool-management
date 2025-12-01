import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
    key: {
        type : String,
        unique : true,
        required : true,
        trim : true
    },

    translations : {
        en : {
            type : String,
            required : true,
        },
        hi : {
            type : String
        },
        es : {
            type : String
        },
        fr : {
            type : String
        },
    },   
},
    { timestamps : true }
)

export default mongoose.model("Translation" , translationSchema)