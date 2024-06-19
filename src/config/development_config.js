require("dotenv").config();

module.exports = {
    // backend_addr: "http://127.0.0.1:3000",
    backend_addr: process.env.REACT_APP_BACKEND_URL,
};
