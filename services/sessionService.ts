const AGENT_SESSION_KEY = 'agent-auth-token';

/**
 * Sets the authenticated agent's session in sessionStorage.
 * @param agentName - The name of the logged-in agent.
 */
export const setAgentSession = (agentName: string): void => {
  try {
    sessionStorage.setItem(AGENT_SESSION_KEY, agentName);
  } catch (error) {
    console.error('Failed to set agent session in sessionStorage:', error);
  }
};

/**
 * Retrieves the authenticated agent's name from sessionStorage.
 * @returns The agent's name if a session exists, otherwise null.
 */
export const getAgentSession = (): string | null => {
  try {
    return sessionStorage.getItem(AGENT_SESSION_KEY);
  } catch (error) {
    console.error('Failed to get agent session from sessionStorage:', error);
    return null;
  }
};

/**
 * Clears the authenticated agent's session from sessionStorage.
 */
export const clearAgentSession = (): void => {
  try {
    sessionStorage.removeItem(AGENT_SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear agent session from sessionStorage:', error);
  }
};
