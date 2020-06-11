const { Router } = require('express')
const User = require('./../models/User.model')

const router = Router()

router.post('/addtask', async (req, res) => {
    const { userData, text } = req.body

    const candidate = await User.findOne({ id: userData.userId })
    const candidateTasks = candidate.tasks.concat()

    candidateTasks.push({ text, done: false, important: false })
    await User.updateOne({ tasks: candidateTasks })

    const newData = await User.findOne({ id: userData.userId })
    //console.log(newData.tasks[newData.tasks.length - 1])
    res.status(200).json(newData.tasks[newData.tasks.length - 1])
})

router.post('/loadtask', async (req, res) => {
    const { userData } = req.body
    //console.log('userData', userData)
    const candidate = await User.findOne({ id: userData.userId })
    const candidateTasks = candidate.tasks.concat()

    res.status(200).json({ candidateTasks })
})

router.post('/removetask/:id', async (req, res) => {
    try {
        console.log('id', req.params.id)
        const UD = await JSON.parse(req.body.userData)
        const candidate = await User.findOne({ login: UD.login })

        const candidateTasks = candidate.tasks.concat()

        let r = candidateTasks.filter((e) => e._id.toString() !== req.params.id)
        await User.updateOne({ tasks: r })
        res.status(200).json(r)
    } catch (e) {
        console.log('removetask catch e', e.message || e)
    }
})

module.exports = router
