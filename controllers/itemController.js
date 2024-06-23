const Items = require('../model/ItemModel');



module.exports.Item = async(req,res,next)=>{
    try{
        const {name,cost} = req.body;
    const item = await Items.create({
        name,
        cost
    })
    if(item){
        
    return res.json({status: true, item});
    }else{
        console.log('item not retrieved');
    }
}catch(ex){
    next(ex);
}
}

