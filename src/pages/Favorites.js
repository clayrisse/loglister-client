import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';

class Favorites extends Component {
    render() {
        return (
            <div>
                favoriiiiiiiiiites
            </div>
        )
    }
}

export default withAuth(Favorites)
