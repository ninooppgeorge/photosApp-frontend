import React, {Component} from 'react';
import Button from './button.component';

class NavBar extends Component{
    render(){
        return(
            <div className="nav">
                <h3>{this.props.title}</h3>
                <Button path={this.props.backTo} title={this.props.buttonText} />
            </div>
        )
    }
}

export default NavBar;