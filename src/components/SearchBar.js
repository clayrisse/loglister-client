import React, {Component} from 'react';



class SearchBar extends Component {
    state={ term: ''}

    handleChange = (e) => {
        this.setState({term:e.target.value})

    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`this.state.term`, this.state.term)
        this.props.onFormSubmit(this.state.term)
    }

    render() {
        return (
            <div className="search-bar ">
                <form onSubmit={this.handleSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="inputsearch">what do you want to search?</label>
                        <input 
                            id="inputsearch" 
                            type="text" 
                            value={this.state.term}
                            onChange={this.handleChange}

                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar
