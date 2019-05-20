 const express = require('express')
 const route = express.Router()

 route.get('/', (req, res, next)=>{
     res.status(200).json({
         message: "general get its ok"
     })
 })

 route.get('/:activitieId', async (req, res, next)=>{
     const id = await req.params.activitieId
     if(id === 'caminata'){
         res.status(200).json({
             message: 'Caminata'
         })
     }
 })

 route.post('/', (req, res, next)=>{
     res.status(201).json({
         message: 'general post its ok'
     })
 })

 route.patch('/', (req, res, next)=>{
     res.status(200).json({
         message: 'patch its ok'
     })
 })

route.delete('/:activitieId', (req, res, next)=>{
    res.status(200).json({
        message: 'deleted'
    })
})

 module.exports = route