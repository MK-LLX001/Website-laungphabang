
import React, { useState } from 'react'


const InputBox = ({name, type , id , value ,placeholder ,icon,fontSize}) => {
    const [PasswordVisible, setPasswordVisible]= useState(false)

    
  return (
   <div className=' relative w-[100%] mb-4 font-noto_san_lao'>

          <input 
         
           type={type == "password" ? PasswordVisible ? "text": "password": type}
           name={name}
           defaultValue={value}
           id={id}
           placeholder={placeholder}
           className={`input-box text-${fontSize || 'base'} `} // Default to 'base' if fontSize is not provided
           />
          <i className={"fi " + icon + " input-icon"}></i>
      
        {/* ตปุ้มเปีดปีดตา */}
        {
            type == "password"?
                <i className={"fi fi-rr-eye"+( !PasswordVisible ? "-crossed" :"")+" input-icon left-[auto] right-4 cursor-pointer"}
                onClick={()=> setPasswordVisible(currentVal => !currentVal)}
            ></i>
            :""
        }

   </div>
  )
}

const SelectBox = ({ name, id, value, options, placeholder, icon }) => {
  return (
    <div className='relative w-[100%] mb-4 font-noto_san_lao'>
      <select name={name} id={id} defaultValue={value} className='input-box'>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <i className={'fi ' + icon + ' input-icon'}></i>
    </div>
  );
};

const TextareaBox = ({ name, id, value, placeholder, icon, fontSize, rows }) => {
  return (
    <div className='relative w-[100%] mb-4 font-noto_san_lao'>
      <textarea
        name={name}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className={`input-box text-${fontSize || 'base'}`} // Default to 'base' if fontSize is not provided
        rows={rows || 4} // Default to 4 rows if rows is not provided
      />
      <i className={'fi ' + icon + ' input-icon'}></i>
    </div>
  );
};

export { InputBox, SelectBox,TextareaBox };