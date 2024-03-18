// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Image } from '@nextui-org/react'

export default function MeatSlider({ meatData }) {

  if(!meatData) return null
  return (
    <div className=''>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{
          '--swiper-pagination-color' : '#f1c40f'
        }}
      >
        {
          meatData?.map(( meat ) => (
            <SwiperSlide className='w-full' key={meat.id}>
              <Image
                src={meat.photo} 
                alt="ImageCard"
                classNames={{
                  wrapper: 'w-full img-container',
                  img: 'max-h-[600px] object-cover aspect-video w-full'
                }}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
