import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

const threads = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { yourThreads: threads });
});

app.get("/submit", (req, res) => {
  res.render("submit.ejs");
});

app.get("/edit/:id", (req, res) => {
  let targetId = req.params.id * 1;
  let index = threads.findIndex((thread) => thread.id === targetId);
  let threadToUpdate = threads[index].thread;
  res.render("edit.ejs", { id: targetId, thread: threadToUpdate });
});

// app.get("/delete/:id", (req, res) => {
//   let targetId = req.params.id * 1;
//   let index = threads.findIndex((thread) => thread.id === targetId);
//   let threadToUpdate = threads[index].thread;
//   res.render("delete.ejs", { id: targetId, thread: threadToUpdate });
// });

app.post("/submit", (req, res) => {
  let id = Date.now();
  let newThread = req.body["thread"];
  let newData = {
    id: id,
    thread: newThread,
  };
  threads.push(newData);
  res.redirect("/");
  console.log(newData, newData.id, newData.thread);
});

app.patch("/edit/:id", (req, res) => {
  let targetId = req.params.id * 1;
  let index = threads.findIndex((thread) => thread.id === targetId);
  let updatedThread = req.body["thread"];
  threads[index].thread = updatedThread;
  res.redirect("/");
  console.log(targetId, updatedThread);
});

app.delete("/delete/:id", (req, res) => {
  let targetId = req.params.id * 1;
  let index = threads.findIndex((thread) => thread.id === targetId);
  if (index !== -1) {
    threads.splice(index, 1);
    console.log(`Deleted thread with ID ${targetId}`);
    console.log(threads);
  }
  res.redirect("/"); //
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
