# cs465-fullstack

## Architecture

- Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
  - In this project, we used JavaScript in conjunction with Express HTML to create a dynamic, responsive, multi-paged frontend for our customer. Using Express we were able to add routing logic that could be used to add middleware to routes when necessary. This was especially useful when adding authentication. We also created a single-page application for the administrative page using Angular. This approach is more responsive than a multi-paged frontend since we do not need to make as many requests to the server. Additionally, the SPA uses TypeScript rather than JavaScript which is often seen as better for web development.
- Why did the backend use a NoSQL MongoDB database?
  - MongoDB stores documents in JavaScript Object Notation (JSON). Since JavaScript is used as the core of our frontend, MongoDB naturally works well for communicating data with the frontend. We also use the Node.js Mongoose ODM module which allows us to implement schemas to model our data.

## Functionality

- How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
  - JSON is a commonly used format for storing and communicating data. In this application, data is stored in our database using JSON. When the client makes requests to the server, the server communicates any relevant data back to the client in JSON format. This data can then be parsed by the client for processing.
- Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
  - The initial website structure used static HTML pages for rendering each page. We implemented the model-view-controller design principle allowing us to assign routes with controllers. This allows us to inject middleware when routing to different pages. Using middleware, we were able to implement dynamic webpages and authentication. We also created partials using handlebars for dynamic, reusable HTML. These reusable partials allow us to reduce code duplication, improving maintainability and development efficiency.

## Testing

- Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
  - In a full-stack application, endpoints are used to point to a resource on the server and are typically URLs. In a RESTful API, we can specify a method to communicate how the server should process the request. These methods are typically GET, POST, PUT, and DELETE. When implementing security, we can require the user to be authenticated before using specific methods for a request. For example, we might let the user freely make GET requests, but require authentication for POST requests. Using third-party applications such as Postman and MongoDB Compass can be helpful when testing security in full-stack applications.

## Reflection

- How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
  - This course has helped me in expanding my areas of experience in the computer science field. While I have worked with different kinds of web applications in the past, this was my first time creating a full-stack application. This experience was valuable for learning many new skills. I learned how to work with many new frameworks and applications such as Postman, MongoDB Compass, Express, Angular, and Node.js. I also refined or learned new skills such as implementing model-view-controller architecture, developing a RESTful API, testing web applications, and developing reusable software components.
