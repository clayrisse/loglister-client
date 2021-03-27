import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WSearch = () => {

    const [term, setTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] = useState([])

    useEffect(() => {
        const timeoutId = setTimeout(()=>{
           setDebouncedTerm(term) // only searches if ther is something in term
        }, 1000)
        
        return () => {
            clearTimeout(timeoutId)
        }
      }, [term]); 

    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('http://en.wikipedia.org/w/api.php', {
                params: {
                    action:'query',
                    list: 'search',
                    origin:'*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            })
            setResults(data.query.search);
        };
        if (debouncedTerm) search()
    }, [debouncedTerm])

    const renderedResults = results.map(result=>{
        return(
            <div className="item" key={result.pageid}>
            <div className="right floated content">
                <a className="ui button" href={`http://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
            </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <div>
                        <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                        {/* {result.snippet} we dont use this pq returns text with html and we want to change it*/}
                    </div>
                </div>
            </div>
        )
    })
//note:  dangerouslySetInnerHTML={{__html: }}  -> XSS 'cross ssite server atack
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label> Enter Search Term</label>
                    <input className="input" value={term} onChange={e=>setTerm(e.target.value)} />
                </div>
                <div className="ui celled list">
                    {renderedResults}
                </div>
            </div>
        </div>
    )

}

export default WSearch;
