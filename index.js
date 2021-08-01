const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const Post = require('./models/post')
const methordOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/postsForum', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>
{
    console.log('CONNECTION OPEN!');
})
.catch(err => {
    console.log('something went wrong with connection');
    console.log(err);
})



express()
  .use(methordOverride('_method'))
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + '/public'))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async (req, res) => 
  {
      const posts = await Post.find({});
      res.render('posts/index', {posts})
  })
  .get('/posts/new', (req, res) =>
  {
      res.render('posts/new');
  })
  .post('/posts', async (req, res) =>
  {
      const newPost = new Post(req.body);
      await newPost.save();
      console.log(newPost);
      res.redirect(`posts/${newPost._id}`)
  })
  .get('/posts/:id', async (req, res) =>
  {
      const {id} = req.params;
      const post = await Post.findById(id);
      res.render('posts/show',{post})
  })
  .get('/:id/edit', async (req, res) =>
  {
      const {id} = req.params;
      const post = await Post.findById(id);
      res.render('posts/edit', {post});
  })
  .put('/posts/:id', async (req, res) =>
  {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/posts/${post._id}`);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))