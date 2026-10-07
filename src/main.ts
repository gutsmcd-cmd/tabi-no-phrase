import './style.css'
import { askPersist, load, save } from './db'
import { dict, type Dict, type Lang } from './i18n'
import { CATS, LANGS, PHRASES, split, type Cat, type Code } from './phrases'

const DB = 'tabi-no-phrase'
type Mine = { id: string; note: string; text: string }
type Tab = 'all' | 'fav' | 'mine' | Cat

let ui: Lang = 'ja'
let t: Dict = dict.ja
let dest: Code = 'en'
let tab: Tab = 'all'
let query = ''
let favs = new Set<string>()
let mine: Mine[] = []
let voices: SpeechSynthesisVoice[] = []

const app = document.querySelector<HTMLDivElement>('#app')!

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  if (text) n.textContent = text
  return n
}
function btn(cls: string, text: string, on: () => void): HTMLButtonElement {
  const b = el('button', cls, text)
  b.type = 'button'
  b.addEventListener('click', on)
  return b
}

const langInfo = (c: Code) => LANGS.find((l) => l.code === c)!

// ---------- layout ----------
const header = el('header', 'top')
const title = el('h1', 'title')
const langBtn = btn('pill', '', () => {
  ui = ui === 'ja' ? 'en' : 'ja'
  t = dict[ui]
  void save(DB, 'ui', ui)
  render()
})
header.append(title, langBtn)

const lead = el('p', 'lead')
const destLabel = el('p', 'label')
const chips = el('div', 'chips')
const search = el('input', 'search')
search.type = 'search'
search.addEventListener('input', () => {
  query = search.value.trim().toLowerCase()
  renderList()
})
const tabs = el('nav', 'tabs')
const list = el('main', 'list')
const foot = el('footer', 'foot')
app.append(header, lead, destLabel, chips, search, tabs, list, foot)

// ---------- show view ----------
const show = el('div', 'show')
show.hidden = true
const showText = el('p', 'show-text')
const showMeaning = el('p', 'show-meaning')
const showHint = el('p', 'show-hint')
const showBar = el('div', 'show-bar')
const speakBtn = btn('big', '', () => speak())
const closeBtn = btn('big primary', '', () => closeShow())
showBar.append(speakBtn, closeBtn)
show.append(showHint, showText, showMeaning, showBar)
document.body.append(show)
let showing: { text: string; bcp: string | null } | null = null

function fit() {
  // shrink the phrase until it fits the screen
  let size = Math.min(window.innerWidth, window.innerHeight) * 0.22
  showText.style.fontSize = size + 'px'
  const maxH = window.innerHeight * 0.62
  while (size > 18 && (showText.scrollHeight > maxH || showText.scrollWidth > showText.clientWidth + 1)) {
    size *= 0.9
    showText.style.fontSize = size + 'px'
  }
}

function openShow(text: string, meaning: string, code: Code | null) {
  const info = code ? langInfo(code) : null
  showText.textContent = text
  showText.dir = info ? (info.rtl ? 'rtl' : 'ltr') : 'auto'
  showText.lang = info ? info.bcp : ''
  showMeaning.textContent = meaning
  showing = { text, bcp: info ? info.bcp : null }
  speakBtn.hidden = !voiceFor(showing.bcp)
  show.hidden = false
  document.body.classList.add('noscroll')
  history.pushState({ show: 1 }, '')
  requestAnimationFrame(fit)
}
function closeShow(fromPop = false) {
  if (show.hidden) return
  show.hidden = true
  document.body.classList.remove('noscroll')
  try { speechSynthesis.cancel() } catch { /* ignore */ }
  if (!fromPop && history.state && history.state.show) history.back()
}
window.addEventListener('popstate', () => closeShow(true))
window.addEventListener('resize', () => { if (!show.hidden) fit() })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeShow() })

// ---------- speech (optional) ----------
function loadVoices() {
  try { voices = 'speechSynthesis' in window ? speechSynthesis.getVoices() : [] } catch { voices = [] }
  if (showing && !show.hidden) speakBtn.hidden = !voiceFor(showing.bcp)
}
function voiceFor(bcp: string | null): SpeechSynthesisVoice | undefined {
  if (!bcp) return undefined
  const base = bcp.split('-')[0].toLowerCase()
  const exact = voices.find((v) => v.lang.toLowerCase().replace('_', '-') === bcp.toLowerCase())
  return exact ?? voices.find((v) => v.lang.toLowerCase().split(/[-_]/)[0] === base)
}
function speak() {
  if (!showing) return
  const v = voiceFor(showing.bcp)
  if (!v) return
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(showing.text.replace(/\s\/\s/g, ', '))
    u.voice = v
    u.lang = v.lang
    u.rate = 0.85
    speechSynthesis.speak(u)
  } catch { /* never required */ }
}
if ('speechSynthesis' in window) {
  loadVoices()
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

// ---------- rendering ----------
function render() {
  document.documentElement.lang = ui
  document.title = t.app
  title.textContent = t.app
  langBtn.textContent = t.toggle
  lead.textContent = t.lead
  destLabel.textContent = t.dest
  search.placeholder = t.search
  search.setAttribute('aria-label', t.search)
  closeBtn.textContent = t.close
  speakBtn.textContent = '🔊 ' + t.speak
  showHint.textContent = t.showHint
  foot.textContent = t.foot

  chips.replaceChildren(...LANGS.map((l) => {
    const b = btn('chip' + (l.code === dest ? ' on' : ''), '', () => {
      dest = l.code
      void save(DB, 'dest', dest)
      render()
    })
    b.setAttribute('aria-pressed', String(l.code === dest))
    b.append(el('span', 'chip-main', ui === 'ja' ? l.ja : l.en), el('span', 'chip-sub', l.native))
    return b
  }))

  const tabIds: Tab[] = ['all', 'fav', ...CATS, 'mine']
  tabs.replaceChildren(...tabIds.map((id) => {
    const name = id === 'all' ? t.all : id === 'fav' ? t.fav : id === 'mine' ? t.mine : t.cats[id]
    const b = btn('tab' + (id === tab ? ' on' : '') + (id === 'fav' ? ' star-tab' : ''), name, () => {
      tab = id
      render()
    })
    b.setAttribute('aria-pressed', String(id === tab))
    return b
  }))
  renderList()
}

function heading(text: string) { return el('h2', 'cat-h', text) }

function renderList() {
  const nodes: HTMLElement[] = []
  const info = langInfo(dest)
  const q = query
  if (tab === 'mine') {
    nodes.push(addForm())
  }
  if (tab === 'mine' || tab === 'all' || tab === 'fav') {
    const m = mine.filter((x) => !q || (x.note + ' ' + x.text).toLowerCase().includes(q))
    if (tab === 'mine' && !m.length && !q) nodes.push(el('p', 'empty', t.noMine))
    if (tab !== 'fav' && m.length) {
      if (tab === 'all') nodes.push(heading(t.mine))
      for (const x of m) nodes.push(mineRow(x))
    }
  }
  if (tab !== 'mine') {
    const ps = PHRASES.filter((p) => {
      if (tab === 'fav' ? !favs.has(p.id) : tab !== 'all' && p.cat !== tab) return false
      if (!q) return true
      const [txt, kana] = split(p.t[dest])
      return [p.ja, p.en, txt, kana].some((s) => s.toLowerCase().includes(q))
    })
    let last: Cat | null = null
    for (const p of ps) {
      if ((tab === 'all' || tab === 'fav') && p.cat !== last) {
        nodes.push(heading(t.cats[p.cat]))
        last = p.cat
      }
      nodes.push(row(p.id, p.cat, ui === 'ja' ? p.ja : p.en, p.t[dest], info.rtl === true))
    }
    if (tab === 'fav' && !ps.length && !q) nodes.push(el('p', 'empty', t.noFav))
  }
  if (!nodes.length || (q && nodes.every((n) => n.tagName === 'H2' || n.classList.contains('add')))) nodes.push(el('p', 'empty', t.none))
  list.replaceChildren(...nodes)
}

function row(id: string, cat: Cat, meaning: string, entry: string, rtl: boolean) {
  const [txt, kana] = split(entry)
  const shown = cat === 'num' ? `${meaning}  ${txt}` : txt
  const r = el('div', 'row')
  const main = btn('row-main', '', () => openShow(shown, cat === 'num' ? '' : meaning, dest))
  const target = el('span', 'target', txt)
  target.dir = rtl ? 'rtl' : 'ltr'
  target.lang = langInfo(dest).bcp
  main.append(el('span', 'meaning', meaning), target)
  if (kana && (ui === 'ja' || dest !== 'en')) main.append(el('span', 'kana', kana))
  const on = favs.has(id)
  const star = btn('star' + (on ? ' on' : ''), on ? '★' : '☆', () => {
    if (favs.has(id)) favs.delete(id)
    else favs.add(id)
    void save(DB, 'favs', [...favs])
    void askPersist()
    renderList()
  })
  star.setAttribute('aria-label', t.star)
  star.setAttribute('aria-pressed', String(on))
  r.append(main, star)
  return r
}

function mineRow(x: Mine) {
  const r = el('div', 'row mine')
  const main = btn('row-main', '', () => openShow(x.text, x.note, null))
  const target = el('span', 'target', x.text)
  target.dir = 'auto'
  main.append(el('span', 'meaning', x.note || '—'), target)
  const del = btn('star del', '×', () => {
    if (!confirm(t.delAsk)) return
    mine = mine.filter((m) => m.id !== x.id)
    void save(DB, 'mine', mine)
    renderList()
  })
  del.setAttribute('aria-label', t.del)
  r.append(main, del)
  return r
}

function addForm() {
  const f = el('form', 'add')
  f.append(el('h2', 'cat-h', t.addTitle))
  const l1 = el('label', 'field', t.note)
  const note = el('input')
  note.placeholder = t.notePh
  l1.append(note)
  const l2 = el('label', 'field', t.text)
  const text = el('textarea')
  text.rows = 3
  text.dir = 'auto'
  text.placeholder = t.textPh
  l2.append(text)
  const go = el('button', 'big primary', t.add)
  go.type = 'submit'
  f.append(l1, l2, go)
  f.addEventListener('submit', (e) => {
    e.preventDefault()
    const v = text.value.trim()
    if (!v) { text.focus(); return }
    mine = [{ id: 'm' + Date.now().toString(36), note: note.value.trim(), text: v }, ...mine]
    void save(DB, 'mine', mine)
    void askPersist()
    renderList()
  })
  return f
}

// ---------- boot ----------
async function boot() {
  const [u, d, f, m] = await Promise.all([
    load<Lang>(DB, 'ui'), load<Code>(DB, 'dest'), load<string[]>(DB, 'favs'), load<Mine[]>(DB, 'mine'),
  ])
  if (u === 'ja' || u === 'en') { ui = u; t = dict[u] }
  if (d && LANGS.some((l) => l.code === d)) dest = d
  if (Array.isArray(f)) favs = new Set(f)
  if (Array.isArray(m)) mine = m
  render()
}
render()
void boot()
