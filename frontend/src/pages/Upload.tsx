import './global_pages.css'
import TextUpload from '../componets/TextUpload'


function Upload() {
  return (
    <div>
      <div className="pageContainer">
        <h1 className="title">Upload</h1>
        <p className="text">Upload content here.</p>
        <TextUpload />
      </div>
    </div>
  )
}

export default Upload
