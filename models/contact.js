const mongoose = require('mongoose');

const Schema = mongoose.Schema

const contactSchema= new Schema({
    ownerEmail: {type: String , requiired:true},
    name: {type: String, requiired:true},
    phoneNo: {type: String , requiired:true},
    address: {type: String },
    status: {type: String }
})

module.exports= mongoose.model("Contact",contactSchema,"Contact")