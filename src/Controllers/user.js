const battingModel = require("../Models/battingModel")
const bowlingModel = require("../Models/bowlingModel")
const wicketModel = require("../Models/wicketModel")
const bow_batModel = require("../Models/bow_batModel")
const userModel = require("../Models/userModel")
const drillModel = require("../Models/drillsModel")
const categoryModel = require("../Models/categoryModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const curriculumModel = require("../Models/curriculumModel")
const tagModel = require("../Models/tagModel")
const { json } = require("express")
const { listenerCount } = require("../Models/battingModel")

//==========================[user register]==============================
const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, join_as, signup_as, email, password } = data

        if (await userModel.findOne({ phone: phone }))
            return res.status(400).send({ message: "Phone already exist" })

        if (await userModel.findOne({ email: email }))
            return res.status(400).send({ message: "Email already exist" })

        const encryptedPassword = bcrypt.hashSync(password, 12)
        req.body['password'] = encryptedPassword;

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
};

//==========================[user login]==============================
const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "Email and Password is Invalid"
            })
        }

        let compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            return res.status(400).send({
                status: false,
                message: "Your password is invalid"
            })
        };

        let token = jwt.sign({
            userId: user._id,
        }, "project",

        )
        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: {
                userId: user._id,
                name: user.name,
                phone: user.phone,
                join_as: user.join_as,
                signup_as: user.signup_as,
                email: user.email,
                password: user.password,
                token: token
            }
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
};

//===========================[create bat_bow]===============================

const bow_bat = async function (req, res) {
    try {
        let data = req.body;
        data = JSON.parse(JSON.stringify(data));

        const actionCreated = await bow_batModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Success",
            data: actionCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

//==========================[progress screen (batting)]==============================
const createBattings = async function (req, res) {
    try {
        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create batting"
            })
        }
        const battingCreated = await battingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Battings created successfully",
            data: battingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//==========================[progress screen (bowling)]==============================

const createBowlings = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Bowlings"
            })
        }
        const bowlingCreated = await bowlingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Bowling created successfully",
            data: bowlingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//==========================[progress screen (wicket)]==============================
const createWickets = async function (req, res) {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Wickets"
            })
        }
        const wicketCreated = await wicketModel.create(data)
        return res.status(201).send({
            status: true,
            message: "Wicket created successfully",
            data: wicketCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//==========================[create category]==============================
const category = async function (req, res) {
    try {
        let data = req.body;

        let category = await categoryModel.create(data);
        let obj = {}
        obj["category_id"] = category.category_id
        obj["category_name"] = category.category_name

        return res.status(201).send({
            message: "category created successfully",
            data: obj
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//==========================[create tag]==============================

const tag = async function (req, res) {
    try {
        let data = req.body;

        let tags = await tagModel.create(data);
        let obj = {}
        obj["tag_id"] = tags.tag_id
        obj["tag"] = tags.tag
        obj["category_id"] = tags.category_id
        obj["category_name"] = tags.category_name

        return res.status(201).send({
            message: "tags created successfully",
            data: obj
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

//========================================================================

const getTags = async function(req, res){
    try{
    
        let body = req.body;
  
        const Tag = await tagModel.find(body).select({ tag_id: 1, tag: 1, category_id:1, category_name:1, _id: 0 });
  
         return res.status(200).send({
            status: true,
            data: Tag
            
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

//===================================================

const createRoutine = async function (req, res) {
    try {
        let data = req.body;

        let { drills, date, time } = data;

        if (await drillModel.findOne({ date: date, time: time }))
            return res.status(400).send({ status: false, message: "You already have a routine set for this time" })

        const drillsCreated = await drillModel.create(data)

        return res.status(201).send({
            message: "Success",
            data: drillsCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//=======================================================

const getRoutine = async function (req, res) {
    try {
        let data = req.body;

        const getDrills = await drillModel.find(data).sort({ time: data.time })

        return res.status(200).send({
            status: true,
            data: getDrills
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

module.exports = { createUser, userLogin, createBattings, createBowlings, createWickets, bow_bat, createRoutine, getRoutine, category, getTags, tag }