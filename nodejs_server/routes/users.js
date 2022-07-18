const router = require('express').Router();

router.get("/",(req,res)=>{
    res.send({message:"hey it's users route !"});
});

module.exports = router;

//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
           const user = await User.findById(req.params.id);
           const currentUser = await User.findById(req.body.userId);
           if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.send({message:"user has been followed"});
           }else{
            res.status(403).json("you arleady follow this user");
           }

        }catch(err){
            res.status(500).json(err);
        }
        return res.status(400).send({message:"You can't follow yourself"});
    }else{
        res.status(403).json("you cant follow yourself");
    }   
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
           const user = await User.findById(req.params.id);
           const currentUser = await User.findById(req.body.userId);
           if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.send({message:"user has been unfollowed"});
           }else{
            res.status(403).json("you arleady unfollow this user");
           }

        }catch(err){
            res.status(500).json(err);
        }
        return res.status(400).send({message:"You can't unfollow yourself"});
    }else{
        res.status(403).json("you cant unfollow yourself");
    }   
});