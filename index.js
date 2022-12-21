const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, console.log("¡Servidor encendido!"));

app.use(express.json());

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  res.json(canciones);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));

  canciones.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));

  res.send("Canción agregada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  console.log(cancion);
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción modificada con éxito");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;

  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("Canción eliminado con éxito");
});
