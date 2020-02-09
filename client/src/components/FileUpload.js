// import React, {Component} from 'react';
// import Dropzone from 'react-dropzone';

// class FileUpload extends Component {

    // state = {
    //   files: []
    // };

    // onDrop = (file) => {
    //   // this.setState({
    //   //    files: [file, ...this.state.files] 
    //   //   })
    // };

//     constructor() {
//       super();
//       this.onDrop = (files) => {
//         this.setState({files})
//       };
//       this.state = {
//         files: []
//       };
//     }
    
//   render() {
//     const files = this.state.files.map(file => (
//       <li key={file.name}>
//         {file.name} - {file.size} bytes
//       </li>
//     ));

//     return (
//       <Dropzone onDrop={this.onDrop}>
//         {({getRootProps, getInputProps}) => (
//           <section className="container">
//             <div {...getRootProps({className: 'dropzone'})}>
//               <input {...getInputProps()} />
//               <p>Drag and drop some files here, or click to select files</p>
//             </div>
//             <aside>
//               <h4>Files</h4>
//               <ul>{files}</ul>
//             </aside>
//           </section>
//         )}
//       </Dropzone>
//     );
//   }
// }

import React, { Component } from 'react';
import axios from 'axios';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: ''
        }
    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        axios.post("http://localhost:4000/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row-r">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// export default FileUpload