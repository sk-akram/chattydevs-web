export default function SignupPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-3xl font-bold text-center">Get Started</h1>

      <form className="mt-10 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border px-4 py-2"
        />

        <button
          type="button"
          className="w-full rounded bg-black py-2 text-white"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        API access will be enabled after signup.
      </p>
    </section>
  );
}
