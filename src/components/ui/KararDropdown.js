import React, { useState } from 'react';

const KararDropdown = ({ row, handleDeleteAsar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="karar">
      <button className="dropdown_button" onClick={toggleDropdown}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {dropdownOpen && (
        <div className="dropdown_menu">
          <div className="karar_container">
            <a className="positive_karar" href={`/asar/${row._id}`}>
              <i className="fa-solid fa-eye"></i>
              <p className="karar_text">رؤية</p>
            </a>
          </div>
          <div className="karar_container">
            <a href={`/asar/edit/${row._id}`} className="positive_karar">
              <i className="fa-solid fa-pen-to-square"></i>
              <p className="karar_text">تعديل</p>
            </a>
          </div>
          <div className="karar_container">
            <button
              onClick={(e) => handleDeleteAsar(e, row._id)}
              className="negative_karar"
            >
              <i className="fa-solid fa-x"></i>
              <p className="karar_text">مسح</p>
            </button>
          </div>
          <div className="karar_container">
            <a href={`/asar/settings/${row._id}`} className="positive_karar">
              <i className="fa-solid fa-universal-access"></i>
              <p className="karar_text">صلاحيات</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default KararDropdown;
