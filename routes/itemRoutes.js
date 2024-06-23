const { Item } = require("../controllers/itemController");
const { usersItem,arch,getDets,getSelectee,DeleteRoute } = require("../controllers/ItemWithUser");
const rooter = require('express').Router();
const multer = require('multer');
const upload = multer({dest:'uploads/',limits:{fileSize:40*1024*1024}})



rooter.post('/adding',Item);
rooter.get('/achieve',arch);
rooter.post('/addingof',upload.single('image'),usersItem);
rooter.get('/getProductDetails/:_id',getDets);
rooter.get('/getSelected/:name',getSelectee);
rooter.delete('/deleteRoute',DeleteRoute);

module.exports = rooter;