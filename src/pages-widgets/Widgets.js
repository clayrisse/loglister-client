import React, { useState } from 'react'
import WDropdown from '../components-widgets/WDropdown'
import WAccordion from '../components-widgets/WAccordion'
import WSearch from '../components-widgets/WSearch'


const items = [
    {title: 'what is React1?', content: 'sdsvsdsdggagsrfgsg'},
    {title: 'what is React2?', content: 'asdsdsvsdsdggagsrfgsg'},
    {title: 'what is React3?', content: 'ccccsdsvsdsdggagsrfgsg'},
]

const options = [
    {label: 'the color red', value: 'red'},
    {label: 'the color blue', value: 'blue'},
    {label: 'the color green', value: 'green'}
]


const Widgets = () => {
    const [selected, setSelected] = useState(options[0])
    const [showDropdown, setshowDropdown] = useState(true)

    return (
        <div>
            <button onClick={() => setshowDropdown (!showDropdown)}>toggle showDropdown</button>
            { showDropdown ?
            <WDropdown 
                selected={selected} 
                onSelectedChange={setSelected}
                options={options}
            /> 
            : null
            }
            <WSearch />
            <WAccordion items={items}/>
        </div>
    )
}

export default Widgets