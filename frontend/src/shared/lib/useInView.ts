'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, root, rootMargin = '0px 0px -10% 0px', threshold = 0 } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, root, rootMargin, threshold])

  return { ref, inView }
}
