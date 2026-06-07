// add_active_field.js
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const BASE = './public/question-banks'

const folders = readdirSync(BASE)

let totalFiles = 0
let totalQuestions = 0

for (const folder of folders) {
  const files = readdirSync(join(BASE, folder)).filter(f => f.endsWith('.json'))

  for (const file of files) {
    const path = join(BASE, folder, file)
    const data = JSON.parse(readFileSync(path, 'utf-8'))

    const updated = data.map(q => ({
      ...q,
      active: q.active ?? true   // solo agrega si no existe ya
    }))

    writeFileSync(path, JSON.stringify(updated, null, 2))
    totalFiles++
    totalQuestions += updated.length
    console.log(`✅ ${folder}/${file} — ${updated.length} preguntas`)
  }
}

console.log(`\nListo: ${totalFiles} archivos, ${totalQuestions} preguntas actualizadas`)