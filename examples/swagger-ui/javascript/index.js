import v from 'vkrun';
import swaggerUiDist from 'swagger-ui-dist';

// Initialize the Vkrun app
const app = v.App();
app.parseData();
app.cors();

// Initialize Swagger with configuration with Bearer Token security scheme
const swagger = v.swaggerUi({
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API with public and private routes.',
    contact: { name: 'Support', email: 'support@example.com' },
  },
  servers: [{ url: 'http://localhost:3000', description: 'Development Server' }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // You can specify any token format, typically JWT
        description: 'Enter your Bearer token to access the private API'
      }
    }
  }
});

// Define a public route
swagger.route('/public')
  .get({
    summary: 'Public Route',
    description: 'This route is public and requires no authentication.',
    responses: {
      200: {
        description: 'Public response',
        content: {
          'application/json': {
            schema: { 
              type: 'object',
              properties: {
                message: { type: 'string', example: 'This is a public route.' }
              }
            }
          }
        }
      }
    },
    visibilityKeys: ['public']
  });

// Define a private route using Bearer Token authentication
swagger.route('/private')
  .get({
    summary: 'Private Route',
    description: 'This route is private and requires Bearer Token authentication.',
    security: [{ BearerAuth: [] }], // This enables Bearer Token security for this route
    responses: {
      200: {
        description: 'Private response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'This is a private route.' }
              }
            }
          }
        }
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Authentication required with Bearer Token.' }
              }
            }
          }
        }
      }
    },
    visibilityKeys: ['private']
  });

// Public route in the application
app.get('/public', (req, res) => {
  res.status(200).json({ message: 'This is a public route.' });
});

// Private route in the application (requires Bearer Token)
app.get('/private', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (token === 'valid-bearer-token') {
    res.status(200).json({ message: 'This is a private route.' });
  } else {
    res.status(401).json({ message: 'Authentication required with Bearer Token.' });
  }
});

app.get('/api-docs/*', swagger.serve(swaggerUiDist.absolutePath()));

// Start the main server
app.server().listen(3000, () => {
  console.log('Vkrun server running on port 3000');
});
