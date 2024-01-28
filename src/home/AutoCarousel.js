import React from "react";
import img1 from "../assets/quest_2-wallpaper-1600x600.jpg";
import img2 from "../assets/landscape_nature_trees_fields-wallpaper-1600x600.jpg";
import img3 from "../assets/zen_stones_background-wallpaper-1600x600.jpg";

const AutoCarousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide "
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active ">
          <img src={img1} class="d-block w-100" alt="Wild Landscape" />
        </div>
        <div className="carousel-item">
          <img src={img2} class="d-block w-100" alt="Camera" />
        </div>
        <div className="carousel-item">
          <img src={img3} class="d-block w-100" alt="Exotic Fruits" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default AutoCarousel;
