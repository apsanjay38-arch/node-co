const express = require("express");
const path = require("path");

const app = express();
const publicDirectory = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/about", (request, response) => {
  response.sendFile(path.join(publicDirectory, "about.html"));
});

app.get("/contact", (request, response) => {
  response.sendFile(path.join(publicDirectory, "contact.html"));
});

app.post("/contact", (request, response) => {
  const { name, email, message } = request.body;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  const isValid =
    typeof name === "string" &&
    name.trim().length > 0 &&
    name.length <= 80 &&
    typeof email === "string" &&
    email.length <= 254 &&
    validEmail &&
    typeof message === "string" &&
    message.trim().length > 0 &&
    message.length <= 1000;

  response.redirect(303, isValid ? "/contact?sent=1" : "/contact?error=1");
});

app.use(express.static(publicDirectory));

app.use((request, response) => {
  response.status(404).sendFile(path.join(publicDirectory, "404.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
