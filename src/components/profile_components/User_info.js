import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';

function UserProfile() {
    let { id } = useParams();
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const response = await axios.get(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`);
            setUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error while fetching:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.patch(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`, user);
            toast.success("تم تعديل معلوماتك بنجاح")
        } catch (error) {
            console.error("Error while updating user:", error);
            // Optionally: Notify user that an error occurred
        }
    };

    return (
        <div className="card_container">
            {user && (
                <>
                    <div className="sign_element">
                        <label className="sign_label">اسم</label>
                        <input className="sign_input" name="name" value={user.name} onChange={handleChange} />
                    </div>
                    <div className="sign_element">
                        <label className="sign_label">البريد الالكتروني</label>
                        <input className="sign_input" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div className="sign_element_multi">
                        <div className="sign_element">
                            <label className="sign_label">رقم الهاتف</label>
                            <input className="sign_input" name="phone" value={user.phone} onChange={handleChange} />
                        </div>
                        <div className="sign_element">
                            <label className="sign_label">تاريخ الميلاد</label>
                            <input type="date" className="sign_input" name="dob" value={user.dob} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='profile_btn_con'>

                        {user.isMos == false && user.isMosReq == false ?
                        (<Link to="/mos/req" className='submit_btn blue'>طلب التعيين كمستشار</Link>):(<></>)}

                        <button className='submit_btn' onClick={handleSubmit}>حفظ التغييرات</button>
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    );
}

export default UserProfile;
