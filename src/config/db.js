import pg from 'pg'


const { Pool } = pg

export const pool = new Pool({
  user: 'postgres',
  password: 'UFDmtADvvtSihKfLynVUbtIOayiZOHXw',
  host: 'autorack.proxy.rlwy.net',
  database: 'railway',
  port: 12541
})

async function conectarDB(reintentos = 5, espera = 2000) {
  for (let i = 0; i < reintentos; i++) {
    try {
      await pool.connect()
      console.log('¡Conexión exitosa!')
      return
    } catch (err) {
      console.error(`Intento ${i + 1} de ${reintentos}: Error de conexión`, err.stack)
      if (i < reintentos - 1) {
        console.log(`Reintentando en ${espera / 1000} segundos...`)
        await new Promise(res => setTimeout(res, espera))
      }
    }
  }
  console.error('No se pudo establecer conexión después de varios intentos.')
}

conectarDB()
