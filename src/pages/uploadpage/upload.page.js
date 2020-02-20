import React, { Component } from "react";
import Dropzone from 'react-dropzone'


import NavBar from "../../components/nav.component";
import Axios from "axios";
import { ApiURL } from "../../config";

class UploadPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],
            email: null,
            photographer: null
        };
    }
    componentDidMount(){

    }
    onDrop(acceptedFiles){
        acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        this.setState({
           files: acceptedFiles 
        });
        console.log(acceptedFiles)
    }
    upload(){
        console.log(this.state.files)
        const config = { 
            headers: { 
                'Content-Type': undefined,
                "Access-Control-Allow-Origin": "*"
            } };
        let fd = new FormData();
        this.state.files.forEach((val,index)=>{
            fd.append('photo',val)
        })
        fd.append('photographer',this.state.photographer)
        fd.append('email',this.state.email)
        console.log(fd);
        for (var pair of fd.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        Axios.put(ApiURL+'/photosa',fd,config).then((data)=>{
            console.log(data.data)
            this.setState({
                files: [],
                email: null,
                photographer: null
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className="page uploadpage">
                <NavBar title="Upload an image" buttonText="View all images" backTo="/"/>

                <div className="page-content">
                    <div className="dropzone-div">
                        <Dropzone onDrop={this.onDrop.bind(this)} multiple>
                            {({getRootProps, getInputProps}) => (
                                <section className="dropzone-section">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                        
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className="preview-section">
                            {this.state.files.map((file,index)=>{
                                return(
                                    <div className="preview-single" key={index}>
                                        <img src={file.preview}/>
                                    </div>
                                )
                            })}
                        </div>
                        <input type="text" onChange={(e)=>{this.setState({photographer:e.target.value})}} placeholder="Photographer"/>
                        <input type="text" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Email"/>
                        <a className="button blue" onClick={this.upload.bind(this)}>Submit</a>
                    </div>
                </div>
               
            </div>
        )
    }
}
export default UploadPage;