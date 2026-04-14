import { useState, useRef, useEffect, useCallback } from 'react'
import { MapPin } from 'lucide-react'

interface AddressSuggestion {
  label: string
  housenumber?: string
  street?: string
  name: string
  postcode: string
  city: string
  context: string
}

interface Props {
  onSelect: (address: { address: string; city: string; postalCode: string; country: string }) => void
  initialAddress?: string
}

export default function AddressAutocomplete({ onSelect, initialAddress }: Props) {
  const [query, setQuery] = useState(initialAddress ?? '')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 3) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=5`)
      const data = await res.json()
      const results: AddressSuggestion[] = data.features.map((f: any) => ({
        label: f.properties.label,
        housenumber: f.properties.housenumber,
        street: f.properties.street,
        name: f.properties.name,
        postcode: f.properties.postcode,
        city: f.properties.city,
        context: f.properties.context,
      }))
      setSuggestions(results)
      setShowSuggestions(true)
      setHighlightIndex(-1)
    } catch {
      setSuggestions([])
    }
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300)
  }

  const handleSelect = (suggestion: AddressSuggestion) => {
    const streetAddress = suggestion.housenumber
      ? `${suggestion.housenumber} ${suggestion.street ?? suggestion.name}`
      : suggestion.name
    setQuery(suggestion.label)
    setShowSuggestions(false)
    setSuggestions([])
    onSelect({
      address: streetAddress,
      city: suggestion.city,
      postalCode: suggestion.postcode,
      country: 'France',
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1))
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault()
      handleSelect(suggestions[highlightIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Rechercher une adresse…"
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white transition-colors"
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(s)}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                i === highlightIndex ? 'bg-zinc-50' : 'hover:bg-zinc-50'
              } ${i > 0 ? 'border-t border-zinc-100' : ''}`}
            >
              <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-black truncate">{s.name}</p>
                <p className="text-xs text-zinc-400 truncate">{s.postcode} {s.city} — {s.context}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
