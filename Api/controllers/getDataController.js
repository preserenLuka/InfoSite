const prisma = require("../models/prismaClient");

/**
 * @swagger
 * /datalist:
 *   get:
 *     summary: Get a list of all topic and content titles
 *     description: Fetches a combined list of all topic titles and content titles, each labeled with its type.
 *     responses:
 *       200:
 *         description: A list of topic and content titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the item
 *                   type:
 *                     type: string
 *                     enum: [topic, content]
 *                     description: The type of the item (either "topic" or "content")
 *             examples:
 *               example1:
 *                 value:
 *                   - title: "Topic 1"
 *                     type: "topic"
 *                   - title: "Content 1"
 *                     type: "content"
 *                     topicId: 1
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
 *             examples:
 *               example1:
 *                 value:
 *                   error: "Internal server error"
 */
const getDatalist = async (req, res) => {
  try {
    const [topics, contents] = await Promise.all([
      prisma.topic.findMany({ select: { title: true } }),
      prisma.content.findMany({ select: { title: true } }),
    ]);

    const datalist = [
      ...topics.map((topic) => ({
        title: topic.title,
        id: topic.id,
        type: "topic",
      })),
      ...contents.map((content) => ({
        title: content.title,
        id: content.id,
        type: "content",
        topicId: content.topicId,
      })),
    ];

    res.json(datalist);
  } catch (error) {
    console.error("Error fetching datalist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     description: Fetches all topics without their associated content.
 *     responses:
 *       200:
 *         description: A list of topics without their content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   icon?:
 *                    type: string
 *
 */
const getAllTopics = async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        content: false,
      },
    });
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     summary: Get a specific topic by ID
 *     description: Fetches a single topic and its associated content by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the topic
 *     responses:
 *       200:
 *         description: The requested topic with its content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       icon:
 *                         type: string
 *                       lastModified:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Topic not found
 */
const getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        content: {
          include: {
            data: false,
            images: false,
          },
        },
      },
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json(topic);
  } catch (error) {
    console.error("Error fetching topic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /contents/{id}:
 *   get:
 *     summary: Get a specific content by ID
 *     description: Fetches a single content by ID along with its associated images.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content
 *     responses:
 *       200:
 *         description: The requested content with its associated images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 data:
 *                   type: string
 *                 lastModified:
 *                   type: string
 *                   format: date-time
 *                 topicId:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       url:
 *                         type: string
 *                       description:
 *                         type: string
 *       404:
 *         description: Content not found
 *       500:
 *         description: Internal server error
 */
const getContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        id: true,
        title: true,
        data: true,
        lastModified: true,
        topicId: true,
        topic: false,
        icon: true,
        images: [
          {
            id: true,
            url: true,
            description: true,
          },
        ],
      },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDatalist, getAllTopics, getTopicById, getContentById };
