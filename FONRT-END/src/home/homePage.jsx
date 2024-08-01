import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if needed
import Slider from "react-slick";
import PlacePopula from "../components/Popura-place.component";
import Activity from "../components/Popula-Activity-component";
import Sesion from "../components/sesion.popura.compunent";
import Hotel from "../components/Popula-Hotel.component";
import Foods from "../components/Popura-Food.conponent";
import PopuraPost from "../components/PopuraReviewUpload";



function homePage() {
  return (
    <>
      <PlacePopula />
      <Activity />
      <Sesion/>
      <Hotel/>
      <Foods/>
     <PopuraPost/>
    </>
  );
}

export default homePage;







