const express = require('express');
const router = express.Router();
const admin = require('../../models/Admin');
const admins = [
    {id:"131",name:"ysy",age:"1ww1"},
    {id:"4231",name:"yr",age:"1q"},
    {id:"41",name:"ysw",age:"1q1"},
    {id:"433",name:"yser",age:"14"}
]
function viewApp() {
    router.get('/',(req,res)=> res.json({data: viewapps}))
}
function reviewApp() {
    router.get('/',(req,res)=> res.json({data:app}))
}
