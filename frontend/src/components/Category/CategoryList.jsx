import { Link } from "wouter"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { useParams } from "wouter";

// export default function CategoryList({ categories }) {
//   return (
//     <div className="w-full flex justify-center bg-warning-400 py-1 rounded-xl">
//       <ul className="flex gap-x-8">
//         {
//           categories.map(cat => (
//             <li key={cat.id}>
//               <Link 
//                 to={'/carnicos/category/' + cat.id} 
//                 className="text-black text-lg font-semibold hover:text-amber-300 transition">
//                   {cat.name}
//               </Link>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }


export default function CategoryList({ categories }) {
  const { category_id } = useParams()

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        mousewheel={true}
        breakpoints={{
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 7 },
          1440: { slidesPerView: 8 },
          1600: { slidesPerView: 9 },
        }}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-navigation-size' : '20px',
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Navigation]}
        navigation={true}
        className="mySwiper px-12"
      >
        {
          categories.map(cat => (
            <SwiperSlide key={cat.id}>
              <Link 
                to={'/carnicos/category/' + cat.id} 
                className={`text-lg font-semibold hover:text-warning-400 transition ${ category_id === cat.id ? 'text-warning-400' : '' }`}>
                  {cat.name}
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}