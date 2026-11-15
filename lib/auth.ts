// import { betterAuth } from "better-auth"
// import { MongoClient } from "mongodb"
// import { mongodbAdapter } from "@better-auth/mongo-adapter"

// const databaseUrl = process.env.BETTER_AUTH_DB_URI

// if (!databaseUrl) {
//   throw new Error("BETTER_AUTH_DB_URI is missing")
// }

// const client = new MongoClient(databaseUrl)
// const db = client.db("Hireloop")

// export const auth = betterAuth({
//   database: mongodbAdapter(db),

//   emailAndPassword: {
//     enabled: true,
//   },
//       user: {
//        additionalFields: {
//           role: {
//               type: ['seeker', 'recruiter','admin'],
//               input: false
//             } 
//         }
//     },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//   },

//   secret: process.env.BETTER_AUTH_SECRET,
//   baseURL: process.env.BETTER_AUTH_URL,
// })




import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const databaseUrl = process.env.BETTER_AUTH_DB_URI;

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URI is missing from .env");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing from .env");
}

const client = new MongoClient(databaseUrl);

const db = client.db("Hireloop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: true,
        defaultValue: "seeker",
        input: false,
      },
    },
  },
});