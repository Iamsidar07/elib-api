import express from "express"

const app = express()

// routing
app.get("/", (req, res, next) => {
    res.json({message: "hello"})
})

export default app