const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

const tutorials =require('./data/courses.json');
const tutorial = require('./data/tutorial.json');

app.get('/',(req,res)=>{
    res.send('look mama tor heda')
});
app.get('/recipe-tutorials',(req,res)=>{
    res.send(tutorials)
});
app.get('/tutorial',(req,res)=>{
    res.send(tutorial)
});
app.get('/tutorial/:id',(req,res)=>{
    const id = req.params.id;
    const selectedTutorial = tutorial.find(tut =>tut._id === id);
    res.send(selectedTutorial)
});
app.get('/sub-tutorial/:id',(req,res)=>{
    const id = req.params.id;
    const selectedSubTutorial = tutorial.filter(subtut =>subtut.id === id);
    res.send(selectedSubTutorial)
});

app.listen(port,()=>{
    console.log(`server is running mama ${port}`)
})