import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Image Copyright Detector</h1>
      <p className="text-lg mb-6">
        Detect unauthorized image usage using reverse search technology.
      </p>
      <div className="space-x-4">
        <Link href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        <Link href="/auth/sign-up" className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">Sign Up</Link>
      </div>
    </main>
  )
}