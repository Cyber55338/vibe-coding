#!/usr/bin/env node

/**
 * Simple CORS Proxy for Groq API
 * This allows the browser to make requests to Groq without CORS issues
 *
 * Usage: node api-proxy.js
 * Server runs on: http://localhost:3001
 */

const http = require('http');
const https = require('https');

const PORT = 3001;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// IMPORTANT: Replace with your actual Groq API key
// Get it from: https://console.groq.com/keys
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_API_KEY_HERE';

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check endpoint
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            apiConfigured: GROQ_API_KEY !== 'YOUR_API_KEY_HERE'
        }));
        return;
    }

    // Only accept POST to /api/chat
    if (req.url !== '/api/chat' || req.method !== 'POST') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    // Check API key
    if (GROQ_API_KEY === 'YOUR_API_KEY_HERE') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'API key not configured',
            message: 'Set GROQ_API_KEY environment variable or edit api-proxy.js'
        }));
        return;
    }

    // Collect request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        let requestData;

        try {
            requestData = JSON.parse(body);
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
            return;
        }

        // Validate request structure
        if (!requestData.messages || !Array.isArray(requestData.messages)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing or invalid messages array' }));
            return;
        }

        // Set default model if not specified
        if (!requestData.model) {
            requestData.model = 'llama-3.1-8b-instant';
        }

        // Prepare request to Groq API
        const groqRequestData = JSON.stringify(requestData);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Length': Buffer.byteLength(groqRequestData)
            }
        };

        console.log(`[${new Date().toISOString()}] Proxying request to Groq API...`);
        console.log('Model:', requestData.model);
        console.log('Messages:', requestData.messages.length);

        // Make request to Groq
        const groqReq = https.request(GROQ_API_URL, options, (groqRes) => {
            let responseData = '';

            groqRes.on('data', chunk => {
                responseData += chunk;
            });

            groqRes.on('end', () => {
                console.log(`[${new Date().toISOString()}] Received response from Groq (${groqRes.statusCode})`);

                // Forward response to client
                res.writeHead(groqRes.statusCode, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(responseData);
            });
        });

        groqReq.on('error', (error) => {
            console.error(`[${new Date().toISOString()}] Error calling Groq API:`, error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Proxy error',
                message: error.message
            }));
        });

        // Send request
        groqReq.write(groqRequestData);
        groqReq.end();
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║              GROQ API PROXY SERVER RUNNING                 ║
╚════════════════════════════════════════════════════════════╝

🚀 Server listening on: http://localhost:${PORT}
🔑 API Key configured: ${GROQ_API_KEY !== 'YOUR_API_KEY_HERE' ? '✅ Yes' : '❌ No'}

📡 Endpoints:
   POST http://localhost:${PORT}/api/chat
   GET  http://localhost:${PORT}/health

⚙️  Configuration:
   - Set GROQ_API_KEY environment variable
   - Or edit GROQ_API_KEY in api-proxy.js

📖 Usage in browser:
   fetch('http://localhost:${PORT}/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           model: 'llama-3.1-8b-instant',
           messages: [
               { role: 'user', content: 'Hello!' }
           ]
       })
   })

🛑 Stop server: Ctrl+C

${GROQ_API_KEY === 'YOUR_API_KEY_HERE' ?
`
⚠️  WARNING: API key not configured!
   Get your free API key: https://console.groq.com/keys
   Then set it:
   export GROQ_API_KEY="your-key-here"
   node api-proxy.js
` : '✅ Ready to proxy requests to Groq API'}
    `);
});
