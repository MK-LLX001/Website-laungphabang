
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";



const RegisterDone = ( ) =>{

 const { userAuth: { user_name,user_id,state,user_profile_img} } = useContext(UserContext);


    return(
        <section>
        
       <div className=" flex-col justify-center items-center h-cover ">
          
          <div className="profile flex justify-center items-center mt-10">
          <img 
            src={
                user_profile_img && user_profile_img.startsWith("http")
                  ? user_profile_img
                  : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
              }
             className="w-48 h-48 rounded-full"
              />
               
          </div>
            <div className="flex justify-center items-center">
            <p>name: {user_name}</p>
            </div>

            <div className=" text-2xl w-full items-center text-center">
                    <h1 className="my-3 text-Secondary font-semibold md:text-3xl">ລົງທະບຽນສຳເລັດແລ້ວ</h1>
                    <p className="text-Primary md:text-2xl font-semibold ">ກະຮຸນາລໍ ການຍືນຢັນຈາກລະບົບອີກຄັ້ງ ທາງໜ່ອຍງານຈະສົງ "ລະຫັດ code " ແລະ ລາຍລະອຽດ ໄປທາງ Email ຊອງທ່ານ ຂໍຂອບໃຈ </p>
                
                    <Link to="/" className="  my-10 flex justify-center items-center">
                        <p className=" btn-light "> ກັບໄປໜ້າ Home</p>
                     </Link>
                    <hr />
            </div>
       </div>

        </section>
    )
}

export default RegisterDone;