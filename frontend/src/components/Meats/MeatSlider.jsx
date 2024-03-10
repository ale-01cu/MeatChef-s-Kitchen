// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Image } from '@nextui-org/react'
import { BASE_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';
import { listMeats } from '../../services/meats';

export default function MeatSlider({ meats }) {
  const [ meatData, setMeatsData ] = useState([])

  useEffect(() => {
    listMeats()
      .then(data => setMeatsData(data.slice(0, 10)))
      .catch(e => {console.error(e)})
  }, [])


  return (
    <div className=''>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          meatData.map(( meat ) => (
            <SwiperSlide className='w-full px-12' key={meat.id}>
              <Image
                src={BASE_URL + '/' + meat.photo} 
                alt="ImageCard"
                classNames={{
                  wrapper: 'w-full img-container',
                  img: 'max-h-[420px] object-cover aspect-video w-full'
                }}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
