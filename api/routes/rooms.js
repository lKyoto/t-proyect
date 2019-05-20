const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'metodo get!'
    })
})

router.get('/:roomId', async (req, res, next)=>{
    const id = await req.params.roomId;
    if(id ==='individual'){
        res.status(200).json({
            message: 'Cuarto inidividual'
        })
    } else {
        res.status(200).json({
            message: 'Id no encontrado'
        })
    }
})

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Metodo post'
    })
})

router.patch('/:roomId', (req, res, next)=>{
    res.status(200).json({
        message: 'metodo patch'
    })
})

router.delete('/:roomId', (req, res, next)=>{
    res.status(200).json({
        message: 'Delete'
    })
})

module.exports = router