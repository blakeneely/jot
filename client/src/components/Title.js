import 'bootstrap-4-grid/css/grid.min.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export class Title extends Component {
    render() {
        return (
            <div className="app-container container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <h1>Jot Note Management</h1>
                    </div>
                </div>
            </div>
        )
    }
}
export default Title
