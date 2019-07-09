require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./product_controller')

const app = express()

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
})
.catch(err => console.log('err', err))

app.use(express.json())

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => {
    console.log(`Flying on port ${SERVER_PORT}`);
})
