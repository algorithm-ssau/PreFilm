const {Shema, model}=require("mongoose")

const Pastry=new Shema({
    id:{type:String, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    rating:{type:String, required:true},
    image:{type:String, required:true}
})

module.exports=model('Pastry',Pastry)