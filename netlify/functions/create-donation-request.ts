import { isValidDonationRequestPayload } from './utils/validators';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    if (!isValidDonationRequestPayload(data)) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ error: 'Invalid donation request payload. Please check your data.' }),
      };
    }

    console.log('Received valid donation request:', data);
    
    // In a real application, you would now:
    // 1. Validate the data.
    // 2. Insert it into your Neon database.
    // 3. Potentially create a new 'AgentTask'.
    // 4. Return the newly created record or a success message.

    return {
      statusCode: 201, // 201 Created
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Donation request received successfully!', data }),
    };
  } catch (error) {
    console.error('Error processing donation request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process donation request.' }),
    };
  }
};
