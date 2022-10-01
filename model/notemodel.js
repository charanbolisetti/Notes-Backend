var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({
    title : String,
    description : String,
    userId : String
})

module.exports = mongoose.model('Notes2',userSchema);