import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Recommendation.sass";
import "swiper/swiper.scss";

import "./Recommendation.sass";
function Recommendation({ recommendation }) {
  const [similarData, setSimilarData] = useState([]);
  const [isLoadingSimilarData, setisLoadingSimilarData] = useState(false);
  let average = [];

  let calcVoteAverage = (index) => {
    let countVoteAverage = similarData[index].vote_average * 10;
    average.push(countVoteAverage);
  };
  useEffect(async () => {
    let promises = [];
    recommendation.results.map((item) => {
      promises.push(
        fetch(
          `https://api.themoviedb.org/3/movie/${item.id}?api_key=c81dbb52630c695069ceb9c73e137dc2`
        )
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
            <Swiper spaceBetween={50} slidesPerView={3}>
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
                      <span className="recommendation__title">
                        {item.title}
                      </span>
                      <span className="recommendation__vote_average">
                        {average[index]}%
                      </span>
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

export default Recommendation;
