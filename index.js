var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();

app.use(express.urlencoded({ extended: false }));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files')
  },
  filename: (req, file, cb) => {
    let date = new Date().toDateString();
    cb(null, `${date}-${file.originalname}`)
  }
});

const upload = multer({ storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
