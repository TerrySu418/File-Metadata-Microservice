var express = require('express');
var cors = require('cors');
require('dotenv').config()
const fileUpload = require('express-fileupload');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "upfile") is used to retrieve the uploaded file
  const upfile = req.files.upfile;
  const uploadPath = __dirname + '/' + upfile.name;

  // Use the mv() method to place the file somewhere on your server
  upfile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.json({
      name: upfile.name,
      type: upfile.mimetype,
      size: upfile.size,
    });
  });
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
