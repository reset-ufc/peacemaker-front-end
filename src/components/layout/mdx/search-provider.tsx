"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { allDocs } from "@/lib/docs"

type SearchResult = {
  title: string
  description: string
  slug: string
}

interface SearchContextType {
  searchResults: SearchResult[]
  search: (query: string) => void
  isSearching: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const search = (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    const lowerCaseQuery = query.toLowerCase()

    const results = allDocs
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(lowerCaseQuery) || doc.description.toLowerCase().includes(lowerCaseQuery),
      )
      .map((doc) => ({
        title: doc.title,
        description: doc.description,
        slug: doc.slug,
      }))

    setSearchResults(results)
    setIsSearching(false)
  }

  return <SearchContext.Provider value={{ searchResults, search, isSearching }}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

