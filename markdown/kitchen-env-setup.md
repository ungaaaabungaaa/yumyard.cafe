# Kitchen Env Setup

Add these values to `.env.local` in the project root:

```bash
KITCHEN_CHEF_NAME="Chef Name"
KITCHEN_CHEF_MOBILE="9999999999"
KITCHEN_CHEF_PASSWORD="change-this-password"
```

Kitchen login is available at `/kitchen/login`.

Protected kitchen pages:

- `/kitchen/order`
- `/kitchen/delivery`
- `/kitchen/orderdetails`
- `/kitchen/deliverydetails`

Kitchen sessions expire after 7 days. After that, the browser is redirected back to `/kitchen/login`.

Optional shared session signing secret:

```bash
AUTH_SESSION_SECRET="use-a-long-random-string"
```

Restart the Next.js dev server after changing `.env.local`.
