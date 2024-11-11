const express = require('express');
const router = express.Router();
const products = require('../data/products.json')

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список продуктов
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         required: false
 *         description: ID категории
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         required: false
 *         description: Номер страницы для пагинации
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Количество продуктов на странице
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ с массивом продуктов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: object
 *                         properties:
 *                           categoryId:
 *                             type: integer
 *                           categoryName:
 *                             type: string
 *                       img:
 *                         type: string
 *                       rate:
 *                         type: number
 *                       description:
 *                         type: string
 *                       ar_date:
 *                         type: string
 *                       availability:
 *                         type: boolean
 *                       reviews:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             userId:
 *                               type: integer
 *                             rate:
 *                               type: number
 *                             productId:
 *                               type: integer
 *                             text:
 *                               type: string
 */
router.get('/products', (req, res) => {
    const { categoryId = 0, page = 1, limit = 20 } = req.query;

    let filteredProducts;
    if (categoryId == 0) {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category.categoryId == categoryId);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        products: paginatedProducts,
    });
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить продукт по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID продукта
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ с данными продукта
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     categoryId:
 *                       type: integer
 *                     categoryName:
 *                       type: string
 *                     img:
 *                       type: string
 *                     description:
 *                       type: string
 *                     ar_date:
 *                       type: string
 *                     rate:
 *                       type: number
 *                     availability:
 *                       type: boolean
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           userId:
 *                             type: integer
 *                           rate:
 *                             type: number
 *                           productId:
 *                             type: integer
 *                           text:
 *                             type: string
 *       404:
 *         description: Продукт не найден
 */
router.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find(p => p.id === productId);
    
    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ message: 'Продукт не найден' });
    }
});


module.exports = router;