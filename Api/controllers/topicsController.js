const prisma = require("../models/prismaClient");

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     description: Creates a new topic .
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
 *
 *     responses:
 *       201:
 *         description: The created topic
 */
const createTopic = async (req, res) => {
  const { title, description, content } = req.body;

  try {
    const newTopic = await prisma.topic.create({
      data: {
        title,
        description,
      },
    });

    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /topics/{id}:
 *   put:
 *     summary: Update a topic
 *     description: Updates a topic's title or description.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the topic
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
 *       200:
 *         description: The updated topic
 */
const updateTopic = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTopic = await prisma.topic.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
      },
    });

    res.json(updatedTopic);
  } catch (error) {
    console.error("Error updating topic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     summary: Delete a topic
 *     description: Deletes a topic and its associated content.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the topic
 *     responses:
 *       204:
 *         description: Topic deleted successfully
 *       500:
 *        description: Internal server error
 */
const deleteTopic = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.topic.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTopic,
  updateTopic,
  deleteTopic,
};
