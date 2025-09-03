/**
 * @swagger
 * tags:
 *   name: Video
 *   description: API для работы с видео
 */

/**
 * @swagger
 * /video/get/{id}:
 *   get:
 *     summary: Получить видео по ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID видео (например, 1.mp4)
 *     responses:
 *       200:
 *         description: Видео найдено и возвращено
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Видео не найдено
 *       500:
 *         description: Ошибка сервера
 */

/**
 * @swagger
 * /video/get/{id}/download:
 *   get:
 *     summary: Скачать видео по ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID видео (например, 1.mp4)
 *     responses:
 *       200:
 *         description: Файл видео успешно отправлен для скачивания
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Видео не найдено
 *       500:
 *         description: Ошибка сервера
 */




const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/get/:id', videoController.getVideoById);
router.get('/get/:id/download', videoController.downloadVideoById);

module.exports = router;
