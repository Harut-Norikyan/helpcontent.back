/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Работа с пользователями
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
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
 *                   name:
 *                     type: string
 *                     example: Leanne Graham
 *                   username:
 *                     type: string
 *                     example: Bret
 *                   email:
 *                     type: string
 *                     example: Sincere@april.biz
 *
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Leanne Graham
 *                 username:
 *                   type: string
 *                   example: Bret
 *                 email:
 *                   type: string
 *                   example: Sincere@april.biz
 *       404:
 *         description: Пользователь не найден
 */



const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/', usersController.getUsers);       // все
router.get('/:id', usersController.getUserById); // один по id

module.exports = router;