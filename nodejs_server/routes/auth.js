const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
    try{
        const user = await new User({
            username: "John",
            email: "john@gmail.com",
            password: "123456",
        })   
    
        await user.save();
        res.send("ok");
    }catch(err){
        console.log(err);
    }
    
});

module.exports = router;