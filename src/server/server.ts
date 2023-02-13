import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());

interface IPost {
  id: number;
  text: string;
  time: number;
}

let idStart = 1;

let posts: IPost[] = [];

app.get("/api/posts", (req: Request, res: Response) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const filteredPost = posts.filter((post) => post.id === Number(id));
  res.json(filteredPost);
});
app.post("/api/posts", (req: Request, res: Response) => {
  const { id, text } = req.body;
  const newPost = {
    id: idStart,
    text: text,
    time: Date.now(),
  };
  posts.push(newPost);
  res.status(200).send("Successfully created");
  idStart += 1;
});

app.put("/api/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const text = req.body.text;
  const updatedPosts = posts.map((post) => {
    if (post.id === Number(id)) {
      post.text = text;
    }
    return post;
  });
  res.send(updatedPosts);
});

app.delete("/api/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== Number(id));
});

app.listen("3001", () => console.log("Server listening on port 3001"));
