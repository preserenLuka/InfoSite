const prisma = require("../models/prismaClient");

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     description: Creates a new topic with a title, description, and optional icon.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the topic
 *                 example: "Sample Topic"
 *               description:
 *                 type: string
 *                 description: A brief description of the topic
 *                 example: "This is a sample topic description."
 *               icon:
 *                 type: string
 *                 description: An optional icon for the topic
 *                 example: "sample-icon.png"
 *     responses:
 *       201:
 *         description: The created topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the topic
 *                 title:
 *                   type: string
 *                   description: The title of the topic
 *                 description:
 *                   type: string
 *                   description: A brief description of the topic
 *                 icon:
 *                   type: string
 *                   description: The optional icon of the topic
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
const createTopic = async (req, res) => {
  const { title, description, icon } = req.body;

  try {
    const newTopic = await prisma.topic.create({
      data: {
        title,
        description,
        icon,
      },
    });

    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTopic };
