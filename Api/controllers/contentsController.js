const prisma = require("../models/prismaClient");

/**
 * @swagger
 * /contents:
 *   post:
 *     summary: Create a new content
 *     description: Creates a new content and associates it with a topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               data:
 *                 type: string
 *               image:
 *                 type: string
 *               topicId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created content
 */
const createContent = async (req, res) => {
  const { title, data, image, topicId } = req.body;

  try {
    const contentData = {
      title,
      data,
      topicId,
    };

    // Add the image field only if it is provided
    if (image) {
      contentData.image = image;
    }

    const newContent = await prisma.content.create({
      data: contentData,
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /contents/{id}:
 *   put:
 *     summary: Update a content
 *     description: Updates a content's title, data, image, or topic association.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               data:
 *                 type: string
 *               image:
 *                 type: string
 *               topicId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated content
 */
const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, data, image, topicId } = req.body;

  try {
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        title,
        data,
        image,
        topicId,
      },
    });

    res.json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /contents/{id}:
 *   delete:
 *     summary: Delete a content
 *     description: Deletes a content by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content
 *     responses:
 *       204:
 *         description: Content deleted successfully
 *       500:
 *         description: Internal server error
 */
const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.content.delete({
      where: { id },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createContent,
  updateContent,
  deleteContent,
};
