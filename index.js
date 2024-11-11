const express = require('express');
const cors = require('cors'); // Импортируйте cors
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = 10000;

app.use(cors()); // Включите CORS
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Perlee Documentation',
      version: '1.0.0',
      description: process.env.DESCRIPTION,
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});