import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './../App';
import { Navigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/blog-upload.component';
import PublishForm from '../components/publish-form.component';
import HomepageUpload from './home.page.upload';
import Loader from '../components/loader.component';

// TODO: Editor Context ส้างอ็อบเจ็กต์ที่ใช้เก็บโครงสร้างข้อมูลของบล็อกบทความ
const blogStructure = {
  title: '',       // ชื่อบทความ
  banner: '',      // รูปภาพปก
  cate: '', //category 
  description: '', //   
};

export const EditorContext = createContext({ });

//เปันหน้า กำนด แต่ละฟอม
const Editor = () => {
  let {id} = useParams();

    const [ blog , setBlog] = useState(blogStructure); //TODO: ส้าง useState เพื่ออัปเดต blog state ในภายหลัง,เมือมีกานป่ๆนแปง
    const [editorState , setEditorState] = useState("editor") //functionโตนี้เปันกานกำนดสีน
    const [textEditor , setTextEditor] = useState({isReady: false});
const [loading,setLoading]= useState(true);
  

    let { userAuth:{ access_token}} = useContext(UserContext)

    useEffect(()=>{
      if(!id){
        return setLoading(false);
      }
    },[])

  return (
    
    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>

    {
      // TODO: this function checks the user token before rendering the blog editor or the publish form or upload form
   
      access_token === null ? <Navigate to="/signin"/> 
      : 
      loading ? <Loader/> :
      (editorState === "editor" ? <BlogEditor/> : <PublishForm/> ) 
    }
  </EditorContext.Provider>
  
        
        
  
  )
}

export default Editor
