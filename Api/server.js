// filepath: e:\github\InfoSite\Api\server.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const getData = require("./routes/getData");
const postData = require("./routes/postData");
const topicsRoutes = require("./routes/topics");
const contentsRoutes = require("./routes/contents");

const app = express();
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
  apis: ["./controllers/*.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
app.use(getData);
//app.use(postData);
//app.use(topicsRoutes);
//app.use(contentsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
});
