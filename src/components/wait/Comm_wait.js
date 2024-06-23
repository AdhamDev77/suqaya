import React from 'react'
import wait from "../../assets/wait.svg"
import { Link } from "react-router-dom";
import "../styles/Wait.css"

function Comm_wait() {
  return (
    <div className='wait_body'>
    <div className='wait_con'>
        <img src={wait}/>
        <h1 className='wait_success'>تم تقديم الطلب بنجاح</h1>
        <h1 className='wait_title'>يُرجى الانتظار إلى أن يتم مراجعة وقبول طلب تسجيل المؤسسة</h1>
        <Link className="link_btn" to="/">الرجوع الي الرئيسية <i class="fa-solid fa-arrow-right"></i></Link>
    </div>
    </div>
  )
}

export default Comm_wait