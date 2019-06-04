/*important
    to add tokens please write the word 'checkAuth' in the method that you wanna checking
    For example
        router.get('/', checkAuth, activitieController.activities_get_all) 
        OR with params 
        router.get('/:activitieId', checkAuth, activitieController.activities_get_all)
*/
const jwt = require('jsonwebtoken')
module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization 
        console.log(token)
        const verify = jwt.verify(token, process.env.JWT_KEY)
        req.userData = verify
        next()
    } catch (error) {
        return res.status(404).json({messaje: 'Auth failed'})
    }
}