//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
let posts = [];

// Load the full build.
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render('index');})

app.get("/posts/:topic", function(req, res) {

  const reqTopic = req.params.topic;

  posts.forEach(function(post) {

    const title = post.Title;

    console.log(_.lowerCase(title) + " is matched with " + _.lowerCase(reqTopic));

    if (_.lowerCase(title) == _.lowerCase(reqTopic)) {
      console.log("There is a match!!!");
      blog = post.Post;
      res.render('post', {
        Title: title,
        Post: blog,
      });
    } else {
      console.log("There is not a match!!!")
      res.sendFile("<h1>Your page was not found.</h1>");
    }

  });

})

app.get("/about", function(req, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render('contact', {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render('compose');
})

app.post("/compose", function(req, res) {
  const blog = {
    Title: req.body.title,
    Post: req.body.post,
    tPost: text_truncate(req.body.post, 50, '...'),
    link: "/posts/" + req.body.title.split(" ").join("-").toLowerCase()
  };
  console.log(blog);
  posts.push(blog);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
