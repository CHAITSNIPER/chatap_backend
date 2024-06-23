const Msg = require('../model/TextModel');

module.exports.addMessage = async(req,res,next)=>{
     try{
        const { from,to,message } = req.body;
        const data = await Msg.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })

        if(data) return res.json({ msg:"message added successfully",data} );
        else return res.status(404).json({ msg:"message not added" });
     }catch(ex){
        next(ex);
     }
}

module.exports.getMessages = async(req,res,next)=>{
    try{
    const {from,to} = req.body;

    const data = await Msg.find({
        users:{
            $all: [from,to],
        },
    }).sort({updatedAt: 1});
    
    const projectMessages = data.map((msg)=>{
        return({
            fromSelf: msg.sender===from,
            message : msg.message.text
        });
    })
    console.log(projectMessages);
    return res.json({ projectMessages });
    }catch(ex){
        next(ex);
    }
}
