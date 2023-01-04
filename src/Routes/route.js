const express = require("express")
const battingController = require("../Controllers/user")
const commnMid = require("../Middleware/Auth")
const Router = express.Router()


Router.post("/user", battingController.createUser)
Router.post("/userlogin", battingController.userLogin)
Router.post("/:userId/bow_batPost",commnMid.jwtValidation,commnMid.authorization, battingController.bow_bat)
Router.post("/:userId/batting",commnMid.jwtValidation,commnMid.authorization, battingController.createBattings)
Router.post("/:userId/bowling",commnMid.jwtValidation,commnMid.authorization, battingController.createBowlings)
Router.post("/:userId/wicketKeeping",commnMid.jwtValidation,commnMid.authorization, battingController.createWickets)
Router.post("/:userId/postDrills",commnMid.jwtValidation,commnMid.authorization, battingController.createRoutine)
Router.get("/:userId/getRoutine",commnMid.jwtValidation,commnMid.authorization, battingController.getRoutine)
Router.post("/:userId/category", commnMid.jwtValidation, commnMid.authorization, battingController.category)
Router.post("/:userId/tag",commnMid.jwtValidation,commnMid.authorization, battingController.tag)
Router.get("/:userId/Tags",commnMid.jwtValidation,commnMid.authorization, battingController.getTags)



//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router


