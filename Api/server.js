const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./prisma/app/generated/prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const port = 3000;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "InfoSite API",
      version: "1.0.0",
      description:
        "API documentation for InfoSite backend using Prisma + Express",
    },
  },
  apis: ["./server.js"], // path to your file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     responses:
 *       200:
 *         description: List of topics
 */
app.get("/topics", async (req, res) => {
  const topics = await prisma.topic.findMany();
  res.json(topics);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root route for testing
 *     responses:
 *       200:
 *         description: Returns Hello World
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Topic created successfully
 */
app.post("/topics", async (req, res) => {
  const { title, description } = req.body;
  const newTopic = await prisma.topic.create({
    data: { title, description },
  });
  res.status(201).json(newTopic);
});

/**
 * @swagger
 * /topics/{id}/content:
 *   get:
 *     summary: Get all content items for a specific topic
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the topic
 *     responses:
 *       200:
 *         description: List of content items for the topic
 */
app.get("/topics/:id/content", async (req, res) => {
  const { id } = req.params;
  const content = await prisma.content.findMany({
    where: { topicId: Number(id) },
  });
  res.json(content);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
});
