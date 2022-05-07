import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import './ActorsCarousel.sass';
import PropTypes from 'prop-types';

function ActorsCarousel({ actors }) {
  return (
    <div className="actors-carousel">
      <h3 className="actors-carousel__starring">In the main roles</h3>
      <Swiper
        spaceBetween={50}
        breakpoints={{
          200: {
            slidesPerView: 1
          },
          400: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1000: {
            slidesPerView: 4
          }
        }}>
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
                <span className="actors-carousel__character">{item.character}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

ActorsCarousel.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
};

export default ActorsCarousel;
