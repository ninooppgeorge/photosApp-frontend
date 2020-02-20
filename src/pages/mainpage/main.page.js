import React, { Component, Fragment } from "react";
import NavBar from "../../components/nav.component";
import Axios from "axios";


import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { ApiURL } from "../../config";

class MainPage extends Component{
    
    constructor(props){
        super(props);
        
        this.ready = true;
        this.state = {
            result: [],
            ogresult: [],
            isOpen: false,
            photoIndex: 0,
            page: 0,
            hideLoad: false
        }
    }
    componentDidMount(){
        document.addEventListener('scroll', this.trackScrolling);   
        this.callApi();
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom-10 <= window.innerHeight;
    }
      
      
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
      
    trackScrolling = () => {
        const wrappedElement = document.getElementById('trigger');
        if(wrappedElement){
            if (this.isBottom(wrappedElement) && this.ready === true) {
    
                this.ready=false;
                var page = this.state.page;
                this.setState({
                    page: page+1
                })
                this.callApi();
                setTimeout(()=>{
                    this.ready = true;
                }, 1000)
    
            }
        }
    };

    callApi(){
        Axios.get(ApiURL+'/photosa?page='+this.state.page+'&count=10').then((data)=>{
            var newdata = data.data;
            
            var olddata = this.state.ogresult;
            console.log(newdata);
            console.log(olddata);
            console.log(this.state.ogresult.concat(data.data));

            var groupBy = function(xs, key) {
                return xs.reduce(function(rv, x) {
                  (rv[x[key]] = rv[x[key]] || []).push(x);
                  return rv;
                }, {});
              };
            
              var groupeddata = groupBy(olddata.concat(newdata), 'date');
              console.log(groupeddata)
            if((data.data).length>0){
                this.setState({
                        result: groupeddata,
                        ogresult: this.state.ogresult.concat(data.data),
                        hideLoad: (data.data.length<10)? true: false
                })
            }else{
                console.log("ss")
                this.setState({
                    hideLoad: true
                })
            }
            
        }).catch((err)=>{
            console.log(err);
        })
    }

    getUrl(index){
        console.log(index);
        console.log(this.state.ogresult)
        var url = ApiURL+"/photosa/uploads/"+this.state.ogresult[index].imageName;
        console.log(url)
        return url;
    }

    openBox(index){
        console.log(index)
        console.log(this.state.ogresult[index])
        var url = ApiURL+"/photosa/uploads/"+this.state.ogresult[index].imageName;
        console.log(url)
        this.setState({ isOpen: true, photoIndex: index })
    }

    render(){
        return(
            <div className="page mainpage">
                <NavBar title="View all image" buttonText="Upload an image" backTo="/upload"/>

                <div className="page-content">
                    <div className="image-container">
                        {Object.values(this.state.result).map((val,index)=>{
                            return(
                                <Fragment key={index}>
                                <span>{Object.keys(this.state.result)[index]}</span>
                                <div  className="group-by">
                                    {val.map((item,ii)=>{
                                        return(
                                            <div className="single-image" onClick={this.openBox.bind(this,ii)} key={ii}>
                                                <img alt="" src={ApiURL+"/photosa/uploads/"+item.imageName}/>
                                            </div>
                                        )
        
                                    })}
                                </div>
                                </Fragment>
                            )
                        })}
                        {(this.state.hideLoad===true)?"":
                            <a id="trigger" className="button blue loadmore">Load more</a>
                        }
                    </div>
                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.getUrl(this.state.photoIndex)}
                            nextSrc={this.getUrl((this.state.photoIndex + 1) % this.state.ogresult.length)}
                            prevSrc={this.getUrl((this.state.photoIndex + this.state.ogresult.length - 1) % this.state.ogresult.length)}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (this.state.photoIndex + this.state.ogresult.length - 1) % this.state.ogresult.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (this.state.photoIndex + 1) % this.state.ogresult.length,
                                })
                            }
                        />
                    )}
                    
                </div>

            </div>
        )
    }
}

export default MainPage;