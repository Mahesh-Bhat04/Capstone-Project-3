import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let postss = [
    {
      id: 1,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
  ];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    res.render("index.ejs", { posts: postss });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = postss[id - 1];
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: postss[id - 1],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const id = postss.length + 1;
    postss.push({
    "id": id,
    "title": req.body.title,
    "content": req.body.content,
    "author": req.body.author,
    "date": new Date(),
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

app.post("/api/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
  if(req.body.title) {
    postss[id - 1].title = req.body.title;
  }
  if(req.body.content) {
    postss[id - 1].content = req.body.content;
  }
  if(req.body.author) {
    postss[id - 1].author = req.body.author;
  }
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

app.get("/api/posts/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = postss.findIndex((post) => post.id === id);
    if (searchIndex > -1) {
        postss.splice(searchIndex, 1);
        res.redirect("/")
    } else {
        res.status(500).json({ message: "Error deleting post" });
    }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
