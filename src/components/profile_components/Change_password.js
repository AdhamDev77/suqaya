import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Change_password() {
  let { id } = useParams();


  const [post, setPost] = useState({currentPassword: "", newPassword: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(post)
};

    const handleSubmit = async () => {
        try {
            // Make a request to your backend to change the password
            const response = await axios.post(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/change_password/${id}`, post);
            // Optionally handle success response
            console.log('Password changed successfully:', response.data);
            setPost({currentPassword: "", newPassword: ""})
            const inputElements = document.querySelectorAll('input');     
            inputElements.forEach(input => {
              if (input.type === 'text' || input.type === 'password' || input.type === 'email') {
                input.value = ''; // Clear the input value
              } else if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false; // Uncheck checkboxes and radio buttons
              } else if (input.type === 'file') {
                input.value = null; // Clear file input value
              } else if (input.type === 'select' || input.type === 'select-multiple') {
                input.selectedIndex = -1; // Reset select input to its default state
              }
            });
            toast.success(response.data.error)
        } catch (error) {
            console.error('Error while changing password:', error);
            toast.error(error.response.data.error)
        }
    };

    return (
        <div className="card_container">
            <div className="sign_element">
                <label className="sign_label">كلمة المرور الحالية</label>
                <input
                    className="sign_input"
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    placeholder="أدخل كلمة المرور الحالية"
                />
            </div>
            <div className="sign_element_multi">
                <div className="sign_element">
                    <label className="sign_label">كلمة المرور الجديدة</label>
                    <input
                        className="sign_input"
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        placeholder="أدخل كلمة المرور الجديدة"
                    />
                </div>
                <div className="sign_element">
                    <label className="sign_label">تأكيد كلمة المرور</label>
                    <input
                        className="sign_input"
                        type="password"
                        placeholder="أكد كلمة المرور الجديدة"
                    />
                </div>
            </div>
            <div className='profile_btn_con'>
    <button onClick={handleSubmit} className='submit_btn'>حفظ التغييرات</button>
    <button className='submit_btn disabled'>تجاهل</button>
    </div>
    <ToastContainer />
    </div>
  )
}

export default Change_password