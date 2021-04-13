import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ActorsCarousel.sass";

import "swiper/swiper.scss";
function ActorsCarousel({ actors }) {
  return (
    <div className="actors-carousel">
      <h3 className="actors-carousel__starring">In the main roles</h3>
      <Swiper slidesPerView={4} spaceBetween={50}>
        {actors.map((item) => {
          return (
            <SwiperSlide key={item.id} className="actors-carousel__box">
              <img
                className="actors-carousel__photo"
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt=""
              />
              <div className="actors-carousel__inner">
                <span className="actors-carousel__actor">{item.name}</span>
                <span className="actors-carousel__character">
                  {item.character}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ActorsCarousel;
