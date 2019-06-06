const express = require('express')
const router = express.Router()

const roomController = require('../controllers/rooms')

router.get('/', roomController.rooms_get_all)

router.get('/:roomId', roomController.room_by_id)

router.post('/', roomController.room_post)

router.patch('/:roomId', roomController.room_patch_id)

router.delete('/:roomId',roomController.room_delete_id)

module.exports = router