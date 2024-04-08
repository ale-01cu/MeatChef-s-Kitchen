import { Link } from "wouter"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { useParams } from "wouter";
import React from "react";

function CategoryList({ categories }) {
  const { category_id } = useParams()

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={-10}
        freeMode={true}
        mousewheel={true}
        breakpoints={{
          0: {slidesPerView: 1 },
          320: {slidesPerView: 4 },
          480: {slidesPerView: 4 },
          640: { slidesPerView: 5 },
          768: { slidesPerView: 8 },
          1024: { slidesPerView: 9 },
          1440: { slidesPerView: 10 },
          1600: { slidesPerView: 11 },
        }}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          // '--swiper-navigation-size' : '20px',
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Navigation]}
        navigation={true}
        className="mySwiper"
      >
        {
          categories.map(cat => (
            <SwiperSlide key={cat.id}>
              <Link 
                to={'/carnicos/category/' + cat.id} 
                className={`rounded-3xl text-pretty hover:bg-default-300 bg-default-200 p-4 text-base font-semibold transition ${ category_id === cat.id ? 'text-warning-400' : '' }`}>
                  {cat.name}
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

const CategoryListMemo = React.memo(CategoryList)
export default CategoryListMemo