import React from "react";
import ProfilImage from "../../image/profil.jpg";
import "./Profil.css";

function Profil() {
  return (
    <div className="lzProfil">
      <img className="lzProfil__image" src={ProfilImage} alt="profil" />
      <span className="lzProfil__title">하루 한 조각 TIL</span>
    </div>
  );
}

export default Profil;
