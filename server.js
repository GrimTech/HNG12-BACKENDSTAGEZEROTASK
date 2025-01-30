require('dotenv').config();

const fastify = require('fastify')({
    logger: {
        level: process.env.LOG_LEVEL || 'info', 
        // prettyPrint: process.env.NODE_ENV !== 'production'
    }
});
const fastifyCors = require('@fastify/cors');
const { execSync } = require('child_process');

// Register CORS
fastify.register(fastifyCors, {
    origin: '*',
});

// Function to get the GitHub repository URL
const getGitHubRepo = () => {
    try {
        const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
        return remoteUrl;
    } catch (error) {
        // Return a custom URI if an error occurs
        return process.env.GITHUB_REPO_URL
    }
};

// Define the response schema
const responseSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        current_datetime: { type: 'string', format: 'date-time' },
        github_url: { type: 'string', format: 'uri' }
    },
    required: ['email', 'current_datetime', 'github_url']
};

// Define the API route with schema validation
fastify.get('/', {
    schema: {
        response: {
            200: responseSchema
        }
    }
}, async (request, reply) => {
    try {
        // Prepare the response data
        const responseData = {
            email: 'olusijackson@gmail.com', 
            current_datetime: new Date().toISOString(),
            github_url: getGitHubRepo()
        };

        // Set the response type to JSON
        reply.type('application/json');

        // Send the response
        return responseData;
    } catch (error) {
        // Log the error for debugging
        fastify.log.error(error);

        // Respond with 500
        reply.status(500).send({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while processing your request.'
        });
    }
});

// Set the port and host
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Start the server
const start = async () => {
    try {
        await fastify.listen({ host: '0.0.0.0', port: PORT });
        fastify.log.info(`Server listening on http://${HOST}:${PORT} in ${process.env.NODE_ENV} mode`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();