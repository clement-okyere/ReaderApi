import expressJSDocSwagger from "express-jsdoc-swagger";

const swaggerDoc = (app) => {
  const options = {
    info: {
      version: "1.0.0",
      title: "Reader Api",
      description: "An endpoint for getting book data from test book api",
      license: {
        name: "MIT",
      },
      contact: {
        name: "Clement Okyere",
        email: "clement.okyere18@gmail.com",
      },
    },
    security: {
      BasicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
    baseDir: __dirname + `../../`,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: "./**/*.js",
    // URL where SwaggerUI will be rendered
    swaggerUIPath: "/api/docs",
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: "/v3/api/docs",
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
  };

  expressJSDocSwagger(app)(options);
};

export default swaggerDoc;
