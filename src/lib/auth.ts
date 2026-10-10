import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

   
  emailAndPassword: {
    enabled: true,

    
    autoSignIn: false,

   
    requireEmailVerification: false,
  },

  
  account: {
    accountLinking: {
      enabled: true,

     
      trustedProviders: ["google"],

      
      disableImplicitLinking: false,

    
      allowDifferentEmails: false,

      // Account link হলে user information update
      updateUserInfoOnLink: true,
    },
  },

  
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});