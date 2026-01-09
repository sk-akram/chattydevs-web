export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <form className="mt-10 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border px-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border px-4 py-2"
        />

        <button
          type="button"
          className="w-full rounded bg-black py-2 text-white"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Auth coming soon.
      </p>
    </section>
  );
}
