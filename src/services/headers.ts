// Default headers for API requests
const defaultHeaders = {
  "Content-Type": "application/json",
  "X-Channel-Id": "WEB",
  Project: "HPCYBER",
};

// Generate correlation and transaction IDs
const generateRequestIds = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 9);

  return {
    correlationId: `${timestamp}${random}`,
    transactionId: `${timestamp}${random.split("").reverse().join("")}`,
  };
};

// Headers for client token requests
export const getClientHeaders = () => {
  const { correlationId, transactionId } = generateRequestIds();

  return {
    "Content-Type": "application/json",
    "X-Channel-Id": "WEB",
    Project: "HPCYBER",
    "X-Correlation-Id": correlationId,
    "X-Transaction-Id": transactionId,
  };
};

// Headers for login requests (using client token)
export const getLoginHeaders = () => {
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("tokenType") || "Bearer";
  const { correlationId, transactionId } = generateRequestIds();

  return {
    Authorization: `${tokenType} ${token}`,
    "Content-Type": "application/json",
    "X-Channel-Id": "WEB",
    Project: "HPCYBER",
    "X-Correlation-Id": correlationId,
    "X-Transaction-Id": transactionId,
  };
};

// Headers for authenticated API requests (using user token)
export const getAuthHeaders = () => {
  const userToken = sessionStorage.getItem("userToken");
  const userTokenType = sessionStorage.getItem("userTokenType") || "Bearer";
  const { correlationId, transactionId } = generateRequestIds();

  return {
    Authorization: `${userTokenType} ${userToken}`,
    "Content-Type": "application/json",
    "X-Channel-Id": "WEB",
    Project: "HPCYBER",
    "X-Correlation-Id": correlationId,
    "X-Transaction-Id": transactionId,
  };
};

export { defaultHeaders };