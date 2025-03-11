
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// For backward compatibility, also export a useMediaQuery function that returns the useIsMobile hook
export function useMediaQuery(query: string) {
  // This is a simplified implementation that just returns the mobile status
  // In a real implementation, this would check the specific query
  console.warn("useMediaQuery is deprecated, please use useIsMobile instead")
  return useIsMobile()
}
