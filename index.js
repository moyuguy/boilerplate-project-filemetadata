var express = require('express');
var cors = require('cors');

const multer = require('multer');
require('dotenv').config()

var app = express();
const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,'uploads/');
  },
  filename:function(req,file,callback){
    const originalname = Buffer.from(file.originalname,'latin1').toString('utf8');
    callback(null,originalname);
  }
});
const upload = multer({storage:storage});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),(req,res) => {
  const {filename,mimetype,size} = req.file;
  return res.json({
    name:filename,
    type:mimetype,
    size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
