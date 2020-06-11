const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const PORT = process.env.PORT || config.get('PORT')

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/tasks', require('./routes/tasks.routes'))

const start = async () => {
    try {
        await mongoose.connect(config.get('MONGO_URI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log('app.js start server error: ', e.message || e)
        process.exit(1)
    }
}

start()
