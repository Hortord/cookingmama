import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/health')
      .then((response) => response.json())
      .then((data) => {
        setHealth(data)
        setLoading(false)
      })
      .catch(() => {
        setHealth({ status: 'error', message: 'Backend unreachable' })
        setLoading(false)
      })
  }, [])

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">CookingMama</p>
        <h1>Projet configuré</h1>
        <p className="subtitle">
          Rails en backend, React en frontend, PostgreSQL dans Docker.
        </p>

        {loading ? (
          <p className="status">Connexion au backend…</p>
        ) : (
          <div className="status-box">
            <span className={`pill ${health?.status === 'ok' ? 'success' : 'error'}`}>
              {health?.status ?? 'unknown'}
            </span>
            <pre>{JSON.stringify(health, null, 2)}</pre>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
