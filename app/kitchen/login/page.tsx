type KitchenLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  invalid: "Invalid kitchen login details.",
  "missing-env": "Kitchen login env values are missing.",
};

export default async function KitchenLoginPage({
  searchParams,
}: KitchenLoginPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? errorMessages[error] : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10 text-neutral-950">
      <form
        action="/api/auth/kitchen/login"
        method="post"
        className="w-full max-w-sm space-y-5"
      >
        <h1 className="text-2xl font-semibold">Kitchen Login</h1>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium">Chef name</span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950"
            name="name"
            required
            type="text"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Chef mobile number</span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950"
            name="mobile"
            required
            type="tel"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Chef password</span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950"
            name="password"
            required
            type="password"
          />
        </label>

        <button
          className="w-full rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}
