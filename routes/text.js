/**
 * @swagger
 * tags:
 *   name: Text
 *   description: API для генерации текста по количеству слов
 */

/**
 * @swagger
 * /text/{count}:
 *   get:
 *     summary: Получить текст, состоящий из заданного количества слов
 *     tags: [Text]
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10000
 *         required: true
 *         description: Количество слов в тексте (максимум 10000)
 *     responses:
 *       200:
 *         description: Текст успешно сгенерирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wordCount:
 *                   type: integer
 *                   example: 100
 *                 text:
 *                   type: string
 *                   example: "apple banana orange pineapple grape watermelon ..."
 *       400:
 *         description: Некорректное количество слов
 *       500:
 *         description: Ошибка сервера
 */


const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

router.get('/:count', textController.getTextByWordCount);

module.exports = router;
