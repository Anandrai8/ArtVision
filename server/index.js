const express = require('express')
const axios = require('axios')
const path = require('path')
const app = express()

const API_BASE = 'https://api.artic.edu/api/v1/artworks'

app.get('/api/artworks', async (req, res) => {
  try {
    const page = req.query.page || 1
    const resp = await axios.get(`${API_BASE}?page=${page}`)
    res.json(resp.data)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'proxy error' })
  }
})

// Serve static (optional) - after building frontend, copy dist here and uncomment
const distPath = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(distPath))
app.get('*', (req,res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server running on', PORT))
