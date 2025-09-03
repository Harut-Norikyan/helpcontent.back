// const path = require('path');
// const fs = require('fs');

// const MAX_WORDS = 10000;
// const wordsFile = path.join(__dirname, '..', 'words.json');

// // Функция для случайного выбора n слов из массива (с повторениями)
// function getRandomWords(wordsArray, count) {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     const randomIndex = Math.floor(Math.random() * wordsArray.length);
//     result.push(wordsArray[randomIndex]);
//   }
//   return result;
// }

// exports.getTextByWordCount = (req, res) => {
//   let count = parseInt(req.params.count);
//   if (isNaN(count) || count < 1) {
//     return res.status(400).json({ error: 'Некорректное количество слов' });
//   }
//   if (count > MAX_WORDS) count = MAX_WORDS;

//   fs.readFile(wordsFile, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Ошибка чтения словаря' });
//     }

//     const wordsArray = JSON.parse(data);
//     const selectedWords = getRandomWords(wordsArray, count);
//     const text = selectedWords.join(' ');

//     res.json({ wordCount: count, text });
//   });
// };


const fs = require('fs');
const path = require('path');

const MAX_WORDS = 10000;
const wordsFile = path.join(__dirname, '..', 'words.json');

function getRandomWords(wordsArray, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    result.push(wordsArray[randomIndex]);
  }
  return result;
}

// Новая функция для добавления запятых и точек и капитализации после точки
function addPunctuation(words, commaFreq = 0.25, dotFreq = 0.15) {
  for (let i = 0; i < words.length - 1; i++) {
    const rnd = Math.random();

    if (rnd < dotFreq) {
      // Добавляем точку
      words[i] = words[i] + '.';
      // Делаем следующее слово с заглавной буквы
      words[i + 1] = words[i + 1].charAt(0).toUpperCase() + words[i + 1].slice(1);
    } else if (rnd < dotFreq + commaFreq) {
      // Добавляем запятую
      words[i] = words[i] + ',';
    }
  }
  return words;
}

exports.getTextByWordCount = (req, res) => {
  let count = parseInt(req.params.count);
  if (isNaN(count) || count < 1) {
    return res.status(400).send('Некорректное количество слов');
  }
  if (count > MAX_WORDS) count = MAX_WORDS;

  fs.readFile(wordsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения словаря');
    }

    const wordsArray = JSON.parse(data);
    let selectedWords = getRandomWords(wordsArray, count);

    // Добавляем знаки препинания и капитализацию
    selectedWords = addPunctuation(selectedWords, 0.25, 0.15);

    // Собираем в строку
    let text = selectedWords.join(' ');

    // Делаем первую букву заглавной (на всякий случай)
    text = text.charAt(0).toUpperCase() + text.slice(1);

    // Добавляем точку в конце, если нет
    if (!text.endsWith('.')) {
      text += '.';
    }

    // Отдаём просто текст
    res.type('text/plain');
    res.send(text);
  });
};
