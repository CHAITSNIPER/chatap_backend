const UserItem = require('../model/ItemUser');
const { deleteMany } = require('../model/userModel');


module.exports.usersItem = async(req,res,next)=>{
    try{
       
       const {username,name,cost,image} = req.body;
       console.log({username,name,cost});
         const items = await UserItem.create({
            username,
            name,
            cost,
            image    
         })
      
         if(items) return res.json({msg: 'item with user created successfully',status:true,items});
         else return res.status(500).json({msg:'item not created',status:false});
       
    }catch(ex){
        next(ex);
    }
}


module.exports.arch= async(req,res,next)=>{
    try{
        const items = await UserItem.find();

        if(items){
            console.log('item retrieved');
        return res.json({status: true, items});
        }else{
            console.log('item not retrieved');
        }
    }catch(ex){
        next(ex);
    }
}

module.exports.getDets = async(req,res,next)=>{
    try{
        const id = req.params._id
        const item = await UserItem.findById(id).select(['username','name','cost','image']);
        
        if(item){
            
            return res.json({msg: 'item successfully retrieved',item});
        }
        else{
            return res.status(404).json({msg:'item not retrieved'});
        }
    }
    catch(ex){
        console.log('error in backend');
        next(ex);
    }
}

module.exports.getSelectee = async(req,res,next)=>{
    try{
        const par = req.params.name;
        const item  = await UserItem.find({ name:{$regex:'^' + par, $options:'i'} });
        const v = await UserItem.find();
        if (item){
            return res.status(200).json({ msg: 'Selected items fetched', item });
        } else {
            return res.status(404).json({ msg: "Couldn't fetch selected items", });
        }
    }catch(ex){
        next(ex);
    }
}
module.exports.DeleteRoute=async(req,res,next)=>{
    try{
        await UserItem.deleteMany({});
       return res.status(200).json({msg:'All items deleted successfully'});
    }catch(err){
        next(err);
    }
}
