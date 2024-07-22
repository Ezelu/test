import React, { forwardRef, useImperativeHandle, useState } from 'react'

export default forwardRef(function Button (props, ref) {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    alterToggle () {
      setToggle(!toggle)
    }
  }))

  return (
    <div>
      <button> Button from child </button> <br/>
      { toggle && <p> Toggle </p>}
    </div>
    
  )
})
