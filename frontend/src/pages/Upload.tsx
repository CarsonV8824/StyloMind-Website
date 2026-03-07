import './global_pages.css'
import TextUpload from '../componets/TextUpload'


function Upload() {
  return (
    
    <div className="pageContainer">
      <div className="ContentOfTitle">
        <h1 className="title">Upload</h1>
        <p className="text">Upload content here.</p>
      </div>
        <TextUpload />
    </div>
    
  )
}

export default Upload
