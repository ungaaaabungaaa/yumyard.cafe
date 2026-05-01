# Admin Env Setup

Add these values to `.env.local` in the project root:

```bash
ADMIN_NAME="Admin Name"
ADMIN_DATE_OF_BIRTH="1990-01-31"
ADMIN_MOBILE="9999999999"
ADMIN_PASSWORD="change-this-password"
```

Use `YYYY-MM-DD` for `ADMIN_DATE_OF_BIRTH`. The admin login screen uses a date picker, and the browser submits the date in that format.

Admin login is available at `/admin/login`.

Protected admin pages:

- `/admin/order`
- `/admin/menu`
- `/admin/editmenu`
- `/admin/editorders`

Admin sessions expire after 30 days. After that, the browser is redirected back to `/admin/login`.

Optional shared session signing secret:

```bash
AUTH_SESSION_SECRET="use-a-long-random-string"
```

Restart the Next.js dev server after changing `.env.local`.
