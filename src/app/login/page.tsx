export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input placeholder="Email" className="w-full border p-3 mb-4 rounded" />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 mb-4 rounded"
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Entrar
        </button>
      </div>
    </main>
  )
}
