/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Работа с постами
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Получить все посты
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Список постов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
 *                   body:
 *                     type: string
 *                     example: quia et suscipit suscipit recusandae consequuntur expedita et cum
 *
 * /posts/{id}:
 *   get:
 *     summary: Получить пост по ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Данные поста
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
 *                 body:
 *                   type: string
 *                   example: quia et suscipit suscipit recusandae consequuntur expedita et cum
 *       404:
 *         description: Пост не найден
 */



const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);       // все
router.get('/:id', postController.getPostById); // один по id

module.exports = router;