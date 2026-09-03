import { useEffect } from "react"

const DEFAULT_TITLE = document.title

/**
 * Sets the document title for a route and restores the default on unmount.
 * Case-study pages otherwise inherit the home page's title, which makes them
 * indistinguishable in search results and browser history.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Aaditya Bhardwaj` : DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
