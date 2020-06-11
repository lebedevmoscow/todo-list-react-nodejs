const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('./../models/User.model')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = Router()

router.post(
    '/register',
    [check('email', 'Incorrect Email!').isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (errors.errors.length > 0) {
                return res.status(400).json(errors.errors[0].msg)
            }
            const { login, email, password } = req.body

            const candidate1 = await User.findOne({ email })
            const candidate2 = await User.findOne({ login })
            if (candidate1 || candidate2) {
                return res.status(400).json('This user is alreay exist!')
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const tasks = []
            const user = new User({
                email,
                password: hashedPassword,
                login,
                tasks,
            })

            await user.save()
            res.status(201).json('User is created!')
        } catch (e) {
            res.status(400).json(e.message || e || 'Something went wrong...')
        }
    }
)

router.post(
    '/login',
    [check('email', 'Entered incorrect email')],
    async (req, res) => {
        try {
            const { login, password, email } = req.body

            validationResult(req)
            const candidate = await User.findOne({ login, email })
            if (!candidate) {
                return res.status(401).json('User is not founded.')
            }

            const token = JWT.sign(
                { userId: candidate.id },
                config.get('JWT_SECRET_KEY'),
                { expiresIn: '1h' }
            )

            console.log('Sign has been successfully')
            res.status(200).json({
                token,
                userId: candidate.id,
                login,
                "DON'T SHOW": true,
            })
        } catch (e) {
            res.status(400).json(e.message || e || 'Something went wrong...')
        }
    }
)

module.exports = router
