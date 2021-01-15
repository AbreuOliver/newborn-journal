const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

const config = {
     apiKey: API_KEY,
     authDomain: AUTH_DOMAIN,
     databaseURL: DATABASE_URL,
     projectId: "breastfeeding-and-diaper-count",
}

export default config;