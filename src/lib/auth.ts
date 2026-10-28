import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const client = new MongoClient(mongoUri);

const db = client.db("bazardor");

export const auth = betterAuth({

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",


  database: mongodbAdapter(db, {
    client,
  }),


  emailAndPassword: {
    enabled: true,
  },


  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID as string,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId:
        process.env.GITHUB_CLIENT_ID as string,

      clientSecret:
        process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});