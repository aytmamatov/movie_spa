import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { API_KEY } from '../../../../config/index';
import './Recommendation.sass';

function Recommendation({ recommendation }) {
  const [similarData] = useState([]);
  const [isLoadingSimilarData, setisLoadingSimilarData] = useState(false);
  const average = [];

  const calcVoteAverage = (index) => {
    const countVoteAverage = similarData[index].vote_average * 10;
    average.push(countVoteAverage);
  };
  useEffect(async () => {
    const promises = [];
    recommendation.results.forEach((item) => {
      promises.push(
        fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}`)
          .then((r) => r.json())
          .then((r) => {
            if (r.backdrop_path !== null) {
              similarData.push(r);
            }
          })
      );
    });
    await Promise.all(promises).then(() => {
      setisLoadingSimilarData(true);
    });
  }, []);
  return (
    <div className="recommendation">
      {isLoadingSimilarData ? (
        <>
          <h3 className="recommendation__heading">Recommendations</h3>
          <div className="recommendation__wrap">
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
              }}
              slidesPerView={3}>
              {similarData.map((item, index) => {
                calcVoteAverage(index);
                return (
                  <SwiperSlide key={item.id}>
                    <div className="recommendation__backdrop_path">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        alt={item.title}
                      />
                    </div>
                    <div className="recommendation__inner">
                      <span className="recommendation__title">{item.title}</span>
                      <span className="recommendation__vote_average">{average[index]}%</span>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      ) : (
        <h3>Unfortunately there are no similar films</h3>
      )}
    </div>
  );
}

Recommendation.propTypes = {
  recommendation: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        backdrop_path: PropTypes.string,
        title: PropTypes.string
      })
    )
  }).isRequired
};

export default Recommendation;
