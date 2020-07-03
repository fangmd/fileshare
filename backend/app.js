const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
// const Serve = require('koa-better-serve');
const StaticFileServer = require('koa-static');
const multer = require('koa-multer');
const fs = require('fs');

var router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Home';
});

router.get('/api/file', async (ctx, next) => {
  const uploadFileFolder = './public/uploads';
  let fileNames = fs.readdirSync(uploadFileFolder);
  let allFile = [];
  for (const name in fileNames) {
    const filePath = `${uploadFileFolder}/${fileNames[name]}`;
    const stats = fs.statSync(filePath);
    console.log(stats);

    const fileModel = {
      name: fileNames[name],
      fullPath: filePath,
      stats: stats,
    };
    allFile.push(fileModel);
  }
  ctx.body = allFile.reverse();
});

app.use(router.routes());
app.use(router.allowedMethods());

// upload file
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split('.'); //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  },
});
var upload = multer({ storage: storage });
router.post('/api/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename, //返回文件名
  };
});
// upload end

// static file
// app.use(StaticFileServer(__dirname + '/statics'));
app.use(StaticFileServer('.'));
// static file end

app.listen(3002);
