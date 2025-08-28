import { isValidBloodRequestPayload } from './utils/validators';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    if (!isValidBloodRequestPayload(data)) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({ error: 'Invalid blood request payload. Please check your data.' }),
        };
    }

    console.log('Received valid blood request:', data);
    
    // In a real application, you would now:
    // 1. Validate the data.
    // 2. Check inventory levels in the database.
    // 3. Insert the request into your Neon database.
    // 4. Create a new 'AgentTask' for delivery.
    // 5. Return the newly created record or a success message.

    return {
      statusCode: 201, // 201 Created
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Blood request received successfully!', data }),
    };
  } catch (error) {
    console.error('Error processing blood request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process blood request.' }),
    };
  }
};
