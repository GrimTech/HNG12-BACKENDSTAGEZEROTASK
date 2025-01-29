const fastify = require('fastify')({ logger: true });
// const fastifyCompress = require('fastify-compress');

// fastify.register(fastifyCompress);

// Define the response schema
const responseSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        datetime: { type: 'string', format: 'date-time' },
        githubUrl: { type: 'string', format: 'uri' }
    },
    required: ['email', 'datetime', 'githubUrl']
};

// Define the API route with schema validation
fastify.get('/api/info', {
    schema: {
        response: {
            200: responseSchema // Specify the response schema
        }
    }
}, async (request, reply) => {
    // Prepare the response data
    const responseData = {
        email: 'your_email@example.com', // Replace with your registered email
        datetime: new Date().toISOString(), // Current datetime in ISO 8601 format
        githubUrl: 'https://github.com/yourusername/your-repo' // Replace with your GitHub URL
    };

    // Send the response
    return responseData;
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server listening on http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
