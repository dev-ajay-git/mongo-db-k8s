const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB URI from environment variable (configured in Kubernetes)
const mongoURI = process.env.MONGO_URI || "mongodb://root:rootpassword@mongo:27017";
