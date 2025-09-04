const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const imageRouter = require('./routes/image');
const textRouter = require('./routes/text');
const audioRouter = require('./routes/audio');
const videoRouter = require('./routes/video');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const todoRouter = require('./routes/todos');

const app = express();
const port = 4000;

app.use(cors());

// Настройка swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HelpContent API',
      version: '1.0.0',
      description: 'API для отдачи изображений, текстов, видео и аудио',
    },
  },
  apis: ['./routes/*.js'], // Здесь указываем, где искать аннотации для swagger
};

const swaggerSpec = swaggerJsdoc(options);

// Роут для документации Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/image', imageRouter);
app.use('/text', textRouter);
app.use('/audio', audioRouter);
app.use('/video', videoRouter);
app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/posts', postRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то сломалось!');
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api-docs`);
});
