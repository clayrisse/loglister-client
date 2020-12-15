import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';

class ListNew extends Component {
    render() {
        return (
            <div>
                listNew
            </div>
        )
    }
}

export default withAuth(ListNew)
