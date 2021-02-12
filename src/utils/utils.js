/* swapBlockElements(s, p) 
    s - first element
    p - secound element
    function for exchanging two blocks
*/
export const swapBlockElements = (s, p) => {
      const parentS = s.current.parentElement
      const parentP = p.current.parentElement

      parentS.prepend(p.current)
      parentP.prepend(s.current)
    }

export const onlyNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "")
  }

