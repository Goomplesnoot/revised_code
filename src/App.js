import React, { useRef, useState } from 'react';
import './App.css'

const App = () => {
  const [data, setdata] = useState([])
  const [response, setresponse] = useState("")
  const [name, setname] = useState("")
  const selectedFile = useRef()

    const retriever=async()=>{
      var xhr=new XMLHttpRequest()
      xhr.open('POST','http://localhost/reactapp/upload.php',true);
      xhr.setRequestHeader("Content-type", "application/x-ww-form-urlencoded");
      xhr.onload=function(){
        setdata(JSON.parse(this.responseText));
      }

      xhr.send(`fetch`);
    }
  const uploader = async () => {
    if(name===''){
      setresponse('name input cannot be empty');
    }
    if(selectedFile.current.files.length===0){
      setresponse('please choose an image')
    } else {
      const formData = new FormData();
      formData.append("picture", selectedFile.current.files[0]);
      formData.append("name", name);

      var xhr= new XMLHttpRequest();
      xhr.open('POST', 'http://localhost/reactapp/upload.php',true);

      xhr.onload=function(){
        if (this.responseText === "success") {
          retriever();
        }
        console.log(this.responseText);
      };

      xhr.send(formData);
    }
  };
  return(
    <div>
      <div className="upload_section">
        <p>{response}</p>
        <input type="type" onChange={(e) => setname(e.target.value)}/>
        <input type="file" ref={selectedFile}/>
        <button onClick={uploader}>Upload</button>
      </div>
      <div className='product_contaner'>
        {data.map((item)=>{
          return(
            <div className="card" key={item.id}>
              <img src={`.././images/${item.picture}`} alt=""/>
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App