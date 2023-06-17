const mongoose =  require("mongoose");
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
    name:{
        type: String, 
        trim: true, 
        requred: true, 
        maxlenght: 32
    },
    description: {
        type: String, 
        trim: true, 
        requred: true, 
        maxlenght: 2000
    },
    price: {
        type: Number,  
        requred: true, 
        maxlenght: 32,
        trim: true
    },
    category: {
        tyype: ObjectId,
        ref: "Category",
        required: true
    }, 
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    }

}, {timestamps: true}
)

module.exports = mongoose.model("Product", productSchema)