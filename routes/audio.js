/**
 * @swagger
 * tags:
 *   name: Audio
 *   description: API для работы с аудио
 */

/**
 * @swagger
 * /audio/get/{id}:
 *   get:
 *     summary: Получить аудио по ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID аудио (номер файла, например 1.mp3)
 *     responses:
 *       200:
 *         description: Аудио найдено и возвращено
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Аудио не найдено
 *       500:
 *         description: Ошибка сервера
 */


/**
 * @swagger
 * /audio/get/{id}/download:
 *   get:
 *     summary: Скачать аудио по ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID аудио (например, 1.mp3)
 *     responses:
 *       200:
 *         description: Файл аудио успешно отправлен для скачивания
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Аудио не найдено
 *       500:
 *         description: Ошибка сервера
 */



const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.get('/get/:id', audioController.getAudioById);
router.get('/get/:id/download', audioController.downloadAudioById);

module.exports = router;
