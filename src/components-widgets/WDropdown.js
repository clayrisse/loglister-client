import React, {useState, useEffect, useRef} from 'react'

const WDropdown = ({options, selected, onSelectedChange}) => {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const onBodyClick = (event) => {
            if ( ref.current && ref.current.contains(event.target))  return //return before invoking
            setOpen(false)
        } 

        document.body.addEventListener('click', onBodyClick)
        
        // //Cl remember this return un useEffect is for cleaning the same function
        // return () => document.body.removeEventListener('click', onBodyClick)
        
    }, [])
    
    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }
        return (
            <div key={option.value} className="item" onClick={()=>{onSelectedChange(option)}}>
                {option.label}
            </div>
        )
    })
    
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select Color</label>
                <div onClick={()=>setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open? 'visible transition': ''} `}>{renderedOptions}</div>
                </div>
                
                <p style={{color: selected.value}}>hello color: {selected.value}</p>
            </div>
        </div>
    )
}

export default WDropdown
