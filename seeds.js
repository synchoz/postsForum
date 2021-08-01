const mongoose = require('mongoose');
const Post = require('./models/post')

mongoose.connect('mongodb://localhost:27017/postsForum', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>
{
    console.log('CONNECTION OPEN!');
})
.catch(err => {
    console.log('something went wrong with connection');
    console.log(err);
})

const posts = [
    {
        subject: 'Hello and welcome',
        replies: 2,
        author: 'Dima Vorobiov',
        posted: '18-06-21',
        posttext: 'i just want to say that it is nice to be here thank you very much!!! and goodbye'
    },
    {
        subject: 'Congrats',
        replies: 1,
        author: 'Alexey',
        posted: '28-07-21',
        posttext: 'congratz on your first sign up'
    },
    {
        subject: 'Happpy bday',
        replies: 6,
        author: 'Max',
        posted: '18-05-21',
        posttext: 'happy birthday mother fker!'
    },
    {
        subject: 'who here like Fallout games?',
        replies: 0,
        author: 'Peter',
        posted: '18-02-21',
        posttext: 'i just wanted to know if there is any one here that likes the recent Fallout game that just has been released'
    }
]

Post.insertMany(posts)
.then(res =>
    {
        console.log(res)
    })
    .catch(error =>
        {
            console.log(error)
        })