import React from 'react'
import logo from "../assets/white_logo_text.svg"
import whatsapp_qr from "../assets/whatsapp_qr.png"
import "./styles/Footer.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer_body'>
    <div className='footer_con'>
        <div className='footer_header'>
            <h1>انضم الي <span>نشرتنا</span><br/> و اعرف المزيد</h1>
            <div className='footer_email'>
                <div className='email_input_holder'>
                    <input className='email_input' placeholder='بريدك الالكتروني'></input>
                    <button className='email_input_btn'>اشترك</button>
                </div>
                <p>نحن نزودك بكل التحديثات والأخبار بشكل دورى</p>
            </div>
        </div>
        <hr/>
        <div className='footer_content'>
            <div className='content_intro'>
                <img src={logo} className=' w-80'/>
                <p>مؤسسة مهنية غير هادفة للربح</p>
                <div className='social'>
                    <a className='social_link' target='_blank' href="https://www.instagram.com/sekayaorg/"><i class="fa-brands fa-instagram"></i></a>
                    <a className='social_link' target='_blank' href="https://x.com/SEKAYAorg?s=09"><i class="fa-brands fa-twitter"></i></a>
                    <a className='social_link' target='_blank' href="https://www.youtube.com/@SEKAYAorg"><i class="fa-brands fa-youtube"></i></a>
                    <a className='social_link' target='_blank' href="https://wa.me/+966114533511"><i class="fa-brands fa-whatsapp"></i></a>
                </div>
            </div>
            <div className='footer_lists'>
            <ul className='footer_list'>
                <li className='list_title'>الروابط</li>
                <li>
                    <Link to="/">الرئيسية</Link>
                  </li>
                  <li>
                    <Link to="/makalat">مكتبة سقاية</Link>
                  </li>
                  <li>
                    <Link to="/">مؤسسة سقاية الأهلية</Link>
                  </li>
                  <li>
                  <Link to="/">استشارات سقاية</Link>
                  </li>
                  <li>
                    <Link to="/about-us">عن المؤسسة</Link>
                  </li>
            </ul>
            <ul className='footer_list'>
                <li className='list_title'>جهات الإتصال</li>
                <li className='contact_item'><label className='contact_item_info'>البريد الإلكترونى <i class="fa-regular fa-envelope"></i></label>
                <label className='contact_item_info'>info@sekaya.org.sa</label>
                </li>
                <li className='contact_item'><label className='contact_item_info'>واتساب <i class="fa-brands fa-whatsapp"></i></label>
                <label className='contact_item_info'><a target='_blank' href="https://wa.me/+966114533511">+966114533511</a></label>
                <img className='footer_qr' src={whatsapp_qr} />
                </li>
            </ul>
            </div>

        </div>
    </div>
            <hr className='last_hr'/>
            <a href='http://jubyte.net' target='_blank' className='footer_footer'>جميع الحقوق محفوظة ©  Jubyte Software</a>
    </div>
  )
}

export default Footer