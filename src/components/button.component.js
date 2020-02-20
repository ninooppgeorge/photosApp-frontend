import React, { Component } from "react";
import { Link } from "react-router-dom";


class Button extends Component{
    render(){
        return(
            <Link className="button red" to={this.props.path}>{this.props.title}</Link>
        )
    }
}

export default Button;