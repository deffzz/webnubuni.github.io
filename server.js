const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ message: 'Archivo subido con éxito', filename: req.file.filename });
});

// Ruta para guardar notas
app.post('/save-note', (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(`uploads/${title}.txt`, content);
  res.send({ message: 'Nota guardada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});