const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4}=require('uuid');
const methodOverrider=require("method-override");

app.use(methodOverrider("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "john_doe",
        content: "Just finished a great book on JavaScript. Highly recommend it!",
        new: false
    },
    {
        id: uuidv4(),
        username: "jane_smith",
        content: "Had an amazing time at the beach today.",
        new: false
    },
    {
        id: uuidv4(),
        username: "coding_enthusiast",
        content: "Currently learning Express.js and it's really fun!",
        new: false
    },
    {
        id: uuidv4(),
        username: "travel_blogger",
        content: "Exploring the beautiful city of Paris. The food is incredible!",
        new: false
    },
    {
        id: uuidv4(),
        username: "foodie_lover",
        content: "Just tried a new recipe for homemade pizza. It turned out delicious!",
        new: false
    },
    {
        id: uuidv4(),
        username: "tech_geek",
        content: "Excited about the new tech gadgets coming out this year.",
        new: false
    },
    {
        id: uuidv4(),
        username: "nature_lover",
        content: "Went for a hike in the mountains today. The view was breathtaking!",
        new: false
    },
    {
        id: uuidv4(),
        username: "music_enthusiast",
        content: "Attended a live concert last night. The band was amazing!",
        new: false
    },
    {
        id: uuidv4(),
        username: "bookworm",
        content: "Started reading a new novel. Can't put it down!",
        new: false
    },
    {
        id: uuidv4(),
        username: "fitness_guru",
        content: "Completed a marathon today. Feeling accomplished!",
        new: false
    },
    {
        id: uuidv4(),
        username: "art_lover",
        content: "Visited an art gallery and saw incredible artworks.",
        new: false
    },
    {
        id: uuidv4(),
        username: "cooking_expert",
        content: "Experimenting with new cooking techniques. Learning a lot!",
        new: false
    },
    {
        id: uuidv4(),
        username: "movie_buff",
        content: "Watched a classic movie marathon over the weekend. Time well spent!",
        new: false
    }
];
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id=uuidv4();
    posts.push({ id,username, content, new: true });
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    // console.log(post);
    // res.send("request working");
    res.render("post.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id === p.id);
    post.content=newContent;
    post.new=true;
    // console.log(post.content);
    // console.log(newContent);
    // console.log(post);
    // res.send("patch request working well");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id === p.id);
    // console.log(post);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id != p.id);
    res.redirect("/posts");
})
app.listen(8000, () => {
    console.log(`App is listening on port 8000`);
});
