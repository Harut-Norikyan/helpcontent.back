const path = require('path');
const fs = require('fs');

const videoDir = path.join(__dirname, '..', 'videos'); // Папка с видео

exports.getVideoById = async (req, res) => {
  try {
    const id = req.params.id;
    const fileName = `${id}.mp4`;
    const videoPath = path.join(videoDir, fileName);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Видео не найдено');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;

      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка обработки видео');
  }
};

exports.downloadVideoById = async (req, res) => {
  try {
    const id = req.params.id;
    const fileName = `${id}.mp4`;
    const videoPath = path.join(videoDir, fileName);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Видео не найдено');
    }

    res.download(videoPath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при скачивании');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка обработки видео');
  }
};
