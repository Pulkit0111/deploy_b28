const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/userRoutes")
const {noteRouter}=require("./routes/noteRoutes")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
        console.log("Server is running at port 8080")
    } catch(err){
        console.log(err)
    }
})