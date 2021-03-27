import React, {Fragment, useState} from 'react'

const WAccordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(null)

    const onTitleClik = (index) => {
        console.log(`indefbgdfbdx`, index)
        setActiveIndex(index)
    }
    const itemList = items.map((item, index)=> {
        const active = index === activeIndex ? 'active' : ''
        return (
            <Fragment key={item.title}>
            {/* <React.Fragment> same as <> </> </React.Fragment> */}
                <div className={`title ${active}`} onClick={() => onTitleClik(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </Fragment>
        )
    })
    return (
        <div className="ui styled accordion">{itemList}</div>
    )
}

export default WAccordion