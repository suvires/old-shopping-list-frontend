import NextAuth, { Session, NextAuthOptions } from 'next-auth'
import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        const user = await res.json()

        if (res.ok && user.token) {
          // Adjunta el token al objeto del usuario que será devuelto
          return { ...user, accessToken: user.token }
        } else {
          // Si la autenticación falla, devolver null
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      // Si el objeto user existe, significa que es una nueva sesión
      // y podemos tomar el accessToken de las credenciales del usuario.
      if (user) {
        token.accessToken = user.accessToken as string
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
