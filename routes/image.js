/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API для работы с изображениями
 */

/**
 * @swagger
 * /image/{width}/{height}:
 *   get:
 *     summary: Получить изображение с заданными размерами
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: width
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ширина изображения
 *       - in: path
 *         name: height
 *         schema:
 *           type: integer
 *         required: true
 *         description: Высота изображения
 *     responses:
 *       200:
 *         description: Изображение найдено и возвращено
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Изображение не найдено
 *       500:
 *         description: Ошибка сервера
 */


const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imageController');

router.get('/:width/:height', imagesController.resizeImage);

module.exports = router;
