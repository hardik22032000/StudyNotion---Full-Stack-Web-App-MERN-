import React from 'react'

const IconButton = ({text,onclick, children, disabled, outline=false, customClasses, type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className={customClasses}>
        {
            children ? (
                <div>
                    <span>
                        {text}
                    </span>
                    {children}
                </div>
            ) : (text)
        }
    </button>
  )
}

export default IconButton;