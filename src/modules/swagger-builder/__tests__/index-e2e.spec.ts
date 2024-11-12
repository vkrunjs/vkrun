import swaggerUiDist from 'swagger-ui-dist'
import { swaggerBuilder } from '..'

describe('SwaggerBuilder', () => {
  it('Should serve the public Swagger documentation and compare with the HTML file', async () => {
    const swagger = swaggerBuilder(swaggerUiDist)
    swagger.create({
      openapi: '3.0.0',
      info: {
        title: 'API de Teste',
        version: '1.0.0',
        description: 'Documentação de teste para Swagger.'
      },
      servers: [{ url: 'http://localhost:3000', description: 'Servidor de Teste' }]
    })

    swagger.route('/public').get({
      summary: 'Rota Pública',
      description: 'Uma rota pública de teste',
      responses: {
        200: {
          description: 'Resposta de sucesso',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { message: { type: 'string' } } }
            }
          }
        }
      }
    })

    const sut = JSON.stringify(swagger.getDocument(), null, 2)

    expect(sut.includes('<!DOCTYPE html>')).toBeTruthy()
  })

  it('Should return the correct configuration for Swagger with all attributes and routes', async () => {
    const swagger = swaggerBuilder(swaggerUiDist)
    swagger.create({
      openapi: '3.0.0',
      info: {
        title: 'Complete API Documentation',
        version: '1.0.2',
        description: 'API documentation for both public and private routes.',
        termsOfService: 'https://example.com/terms/',
        contact: {
          name: 'API Support',
          url: 'https://example.com/support',
          email: 'support@example.com'
        },
        license: {
          name: 'MIT License',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        { url: 'http://localhost:3000', description: 'Development Server' },
        { url: 'https://api.example.com', description: 'Production Server' }
      ],
      tags: [
        { name: 'Public', description: 'Public routes accessible without authentication.' },
        { name: 'Private', description: 'Private routes that require authentication.' }
      ],
      externalDocs: {
        description: 'More information about the API.',
        url: 'https://example.com/docs'
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Mario Elvio' },
              email: { type: 'string', format: 'email', example: 'mario@example.com' }
            },
            required: ['id', 'name', 'email']
          }
        }
      }
    })

    swagger.route('/public')
      .get({
        summary: 'Public Route GET',
        description: 'Public route without authentication.',
        tags: ['Public'],
        visibilityKeys: ['public', 'private'],
        responses: {
          200: {
            description: 'Successful public response',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { message: { type: 'string' } } }
              }
            }
          }
        }
      })
      .post({
        summary: 'Public Route POST',
        description: 'Public route for creating a user.',
        tags: ['Public'],
        visibilityKeys: ['public', 'private'],
        requestBody: {
          $ref: '#/components/requestBodies/CreateUser'
        },
        responses: {
          201: {
            description: 'User created successfully.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          400: { $ref: '#/components/responses/NotFound' }
        }
      })

    const config = swagger.getConfig()

    expect(config).toEqual({
      openapi: '3.0.0',
      info: {
        title: 'Complete API Documentation',
        version: '1.0.2',
        description: 'API documentation for both public and private routes.',
        termsOfService: 'https://example.com/terms/',
        contact: {
          name: 'API Support',
          url: 'https://example.com/support',
          email: 'support@example.com'
        },
        license: {
          name: 'MIT License',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        { url: 'http://localhost:3000', description: 'Development Server' },
        { url: 'https://api.example.com', description: 'Production Server' }
      ],
      tags: [
        { name: 'Public', description: 'Public routes accessible without authentication.' },
        { name: 'Private', description: 'Private routes that require authentication.' }
      ],
      externalDocs: {
        description: 'More information about the API.',
        url: 'https://example.com/docs'
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Mario Elvio' },
              email: { type: 'string', format: 'email', example: 'mario@example.com' }
            },
            required: ['id', 'name', 'email']
          }
        }
      },
      paths: {
        '/public': {
          get: {
            summary: 'Public Route GET',
            description: 'Public route without authentication.',
            tags: ['Public'],
            visibilityKeys: ['public', 'private'],
            responses: {
              200: {
                description: 'Successful public response',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { message: { type: 'string' } } }
                  }
                }
              }
            }
          },
          post: {
            summary: 'Public Route POST',
            description: 'Public route for creating a user.',
            tags: ['Public'],
            visibilityKeys: ['public', 'private'],
            requestBody: {
              $ref: '#/components/requestBodies/CreateUser'
            },
            responses: {
              201: {
                description: 'User created successfully.',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' }
                  }
                }
              },
              400: { $ref: '#/components/responses/NotFound' }
            }
          }
        }
      },
      security: []
    })
  })
})
