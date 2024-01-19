const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();

module.exports = client;

// const { Pool } = require('pg');

// if(process.env.NODE_ENV === "development"){

//  pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {
//   //   require: true,
//   // },
// });
// }
// else{
//    pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     // ssl: {
//     //   require: true,
//     // },
//   });
// }

// async function getPostgresVersion() {
//   const client = await pool.connect();
//   try {
//     const response = await client.query('SELECT version()');
//     console.log(response.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPostgresVersion();

// // pg_dump -Fc -v -d 'postgres://sang:beru0008@localhost:5432/Valence-Health-App' | pg_restore -v -d 'postgresql://daviddorcassangbot:L2Ngp0onuOKG@ep-hidden-mountain-a5kcboa5.us-east-2.aws.neon.tech/neondb?sslmode=require'
