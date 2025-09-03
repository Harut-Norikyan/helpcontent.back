const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'images');

exports.resizeImage = async (req, res) => {
  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);

  if (isNaN(width) || isNaN(height)) {
    return res.status(400).send('Некорректные размеры');
  }

  try {
    // Читаем список файлов в папке
    const files = await fs.promises.readdir(imagesDir);
    // Фильтруем только изображения (можешь добавить форматы, которые нужны)
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    if (imageFiles.length === 0) {
      return res.status(404).send('Изображения не найдены');
    }
    // Выбираем случайный файл
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    const sourceImage = path.join(imagesDir, randomImage);

    // Делает resize и отдаёт результат
    const buffer = await sharp(sourceImage)
      .resize(width, height)
      .toBuffer();

    // Отдаём контент с типом картинки, можно подставить правильный mime, если хочешь
    res.type('image/jpeg');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка обработки изображения');
  }
};
