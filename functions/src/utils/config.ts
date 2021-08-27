import serviceAccounts from "../../serviceaccount.json";

require('dotenv').config();

const {
    DATABASE_URL,
    JWT_SECRET,
} = process.env;

export const realtimeDatabase = {
  serviceAccounts,
  url: DATABASE_URL,
  collections: {
      users: "users",
      products: "products"
  },
};

export const secrets = {
  jwt: JWT_SECRET,
};
