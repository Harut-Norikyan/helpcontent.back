const path = require('path');
const fs = require('fs');

const audioDir = path.join(__dirname, '..', 'audios');

exports.getAudioById = async (req, res) => {
  try {
    const id = req.params.id;
    // Составляем имя файла
    const fileName = `${id}.mp3`; // можно менять расширение при необходимости
    const audioPath = path.join(audioDir, fileName);

    // Проверяем, существует ли файл
    if (!fs.existsSync(audioPath)) {
      return res.status(404).send('Аудио не найдено');
    }

    // Отдаём аудио с правильным Content-Type
    res.type('audio/mpeg'); // mp3
    fs.createReadStream(audioPath).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка обработки аудио');
  }
};

exports.downloadAudioById = async (req, res) => {
  try {
    const id = req.params.id;
    const fileName = `${id}.mp3`;
    const audioPath = path.join(audioDir, fileName);

    if (!fs.existsSync(audioPath)) {
      return res.status(404).send('Аудио не найдено');
    }

    // Заголовок, чтобы браузер предложил скачать файл
    res.download(audioPath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при скачивании');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка обработки аудио');
  }
};

