# Auth SDK

## Getting Started

1. Create the auth client

```typescript
import { createAuthClient } from '@xsuite/auth-sdk'

export const authClient = createAuthClient({
  baseUrl: process.env.BASE_URL,
  authKey: 'auth',
})
```

2. Setup the AuthProvider

```typescript
import { AuthProvider } from "@xsuite/auth-sdk";
import { authClient } from "./auth-client";

function Main() {
  return (
    <AuthProvider client={authClient}>
      <App />
    </AuthProvider>
  );
}
```

3. Use **useAuth** hook

```typescript
import { useAuth } from '@xsuite/auth-sdk'

const { isAuthenticated, isPending, profile, login, logout } = useAuth()

/*
isPending - is the request pending
isAuthenticated - is the user authenticated
profile - the user profile info
login - the function to login
logout - the function to logout
*/
```
