
import CredentialsProvider from "next-auth/providers/credentials"


export const options = {
  // Configure one or more authentication providers
  providers : [
    CredentialsProvider({
        name: "Login",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          // credentials to backend for verification
         
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            credentials: "include",
          });
  
          const user = await res.json();
   
  
          // If no user or error, return null
          if (!res.ok || !user) {
            throw new Error(user?.err.password|| user.err.email || "An error occurred");



          }
          

        
          
          return user
        },
      }),
  ],
   
  callbacks : {
    //called whenever we check session fro the frontend
    async session({ session, token }) {
  
        session.email = token.email
        session.fullname = token.fullname
        return session;
    },
    //if the user is logged in, the token will be passed to the nextjs 
    //user comes from my backend
    async jwt({ token , user }) {
      if (user) {
        token.email = user.email;
        token.fullname = user.fullname;
      }
        return token;
      },
  }

}

