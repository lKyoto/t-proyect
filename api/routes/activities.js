const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const activitieController = require('../controllers/activities')

router.get('/', activitieController.activities_get_all)

router.get('/:activitieId', activitieController.activitie_by_id)

router.post('/', activitieController.activitie_post)

router.patch('/:activitieId', checkAuth, activitieController.activitie_patch_id)

router.delete('/:activitieId',checkAuth, activitieController.activitie_delete_id)

module.exports = router
