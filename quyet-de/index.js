const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionsModel = require('./model');

mongoose.connect('mongodb://localhost:27017/quyet-de-web29', {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connect to MongoDB Success");
        app.use(express.static('./public'));

        app.use(bodyParser.json());
        app.get("/", (req, res) => {

            //__dirname: current working directory
            res.sendFile(path.resolve(__dirname, './public/home.html'));
        });
        app.get("/ask", (req, res) => {

            //__dirname: current working directory
            res.sendFile(path.resolve(__dirname, './public/ask.html'));
        });

        // open page question
        app.get(`/questions/:questionId`, (req, res) => {
            //params

            res.sendFile(path.resolve(__dirname, './public/question.html'));
        });

        // get question from database

        app.get('/get-question-by-id/:questionId', (req, res) => {



            const questionId = req.params.questionId;


            questionsModel.findById(questionId, function (err, question) {
                if (err) {
                    console.log(err.message);
                } else {
                    if (question === null) {

                    } else {
                        const questContent = {
                            id: questionId,
                            content: question.content,
                            like: question.like,
                            dislike: question.dislike
                        };
                        res.json({
                            success: true,
                            data: questContent,
                        });
                    }

                }

            });
            //Oler vesion
            // get Question

            //    fs.readFile('data.json', 'utf-8', function (err, data) {
            //        if (err) throw err;
            //        var questData = JSON.parse(data);
            //        var i;
            //        for (i = 0;i<questData.length;i++) {
            //            if (questData[i].id==questionId) {

            //                const questContent = {
            //                    id: questData[i].id,
            //                    content: questData[i].content,
            //                    like: questData[i].like,
            //                    dislike: questData[i].dislike
            //                };
            // If can not found question:


            //                res.json({
            //                    success: true,
            //                    data: questContent,
            //                });
            //                break;
            //            }
            //        }
            //    });
        });

        app.get('/get-question', (req, res) => {
            questionsModel.countDocuments().exec(function (err, count) {

                var random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                questionsModel.findOne().skip(random).exec(
                    function (err, result) {
                        res.json({
                            success: true,
                            data: result,
                        });

                    })
            })
        });

        // send question to data base
        app.post("/create-question", (req, res) => {
            const newQuestion = {
                content: req.body.questionContent,
            };
            questionsModel.create(newQuestion, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: {
                            id: data._id,
                            content: data.content,
                            like: data.like,
                            dislike: data.dislike
                        }
                    });
                }
            });
        });


        // update vote 
        app.post('/vote/:questionId/:status', (req, res) => {
            const questionId = req.params.questionId;
            const status = req.params.status;
            questionsModel.findById(questionId, function (err, question) {
                if (err) {
                    console.log(err.message);
                } else {
                    if (question == null) {

                    } else {
                        if (status == 1) {

                            question.like = question.like + 1;
                            question.save();
                        }
                        if (status == 0) {
                            question.dislike = question.dislike + 1;
                            question.save();
                        }
                        else {
                            // send Error to client
                        }
                        res.json({
                            success: true,
                            data: question._id,
                        });
                    }
                }

            });
        });

        //search
        app.get("/search", (req, res) => {

            //__dirname: current working directory
            res.sendFile(path.resolve(__dirname, './public/search.html'));
        });

        //post search
        app.post("/search-by-name", (req, res) => {

            const searchValue = req.body.search;
            questionsModel.find({ content: { $regex: `.*${searchValue}.*`, $options: 'i' } }, (err, questionList) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: questionList
                    });
                }


            });

        });

        app.listen(3000, err => {
            if(err) {
                console.log(err);
            } else {
                console.log('Server listen on port 3000...');
            }
        });
    }
});
