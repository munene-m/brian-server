const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController')

router.route('/create').post(protect, createProperty)
router.route('/update/:id').put(protect, updateProperty)
router.route('/delete/:id').delete(protect, deleteProperty)

module.exports = router


