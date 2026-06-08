// config/db.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Ensure all required env variables are present
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_PORT', 'DB_DATABASE'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
}

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // For Azure
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true', // For localhost
  },
};

export const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('✅ MSSQL Connected');
    return pool;
  })
  .catch(err => {
    console.error('❌ Database Connection Failed:', err.message);
    process.exit(1);
  });
