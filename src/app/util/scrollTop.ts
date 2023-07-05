export function scrollTop(behavior?: 'auto' | 'smooth') {
    window.scrollTo({ top: 0, behavior: behavior ?? 'auto' })
}