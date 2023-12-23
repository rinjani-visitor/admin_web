require('dotenv').config()

const getBaseURL = (endpoint) => {
  let url = process.env.NEXT_PUBLIC_BASE_URL_API_ADMIN;

  if (endpoint) {
    url += `${endpoint}`;
  }

  return url;
};

module.exports = getBaseURL
