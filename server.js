const express = require('express')
const cors = require('cors')
const sql = require('mssql')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
}

app.get('/api/hello', async (req, res) => {
    try {
        await sql.connect(dbConfig)

        const result = await sql.query`
            SELECT TOP 1 Text
            FROM Messages
        `

        res.json({
            message: result.recordset[0].Text
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})