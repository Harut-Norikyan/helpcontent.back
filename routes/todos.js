/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Работа с тудушками
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Получить все тудушки
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Список тудушек
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
 *                     example: delectus aut autem
 *                   completed:
 *                     type: boolean
 *                     example: false
 *
 * /todos/{id}:
 *   get:
 *     summary: Получить тудушку по ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID тудушки
 *     responses:
 *       200:
 *         description: Данные тудушки
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
 *                   example: delectus aut autem
 *                 completed:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Тудушка не найдена
 */



const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos);       // все
router.get('/:id', todoController.getTodoById); // один по id

module.exports = router;