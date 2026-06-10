import Link from 'next/link';

const categories = [
  {
    title: 'Adventure',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA49z_6Xq9b-PtOz-DKTYcTXI_rZYDKSDBNuN-YUkcyw865NQ8RRoxeEWFvdDuZmMhxRFNdCK6EGbB5wT3WIjW3dULOnaPt8xysvMInPc1Q76AhTdbIDeeniS785eaLKAu83w-6MRJmvmEVVPIfZRI_aaom5kNfXQHHyne_h0qpng0RSPy-PnoEQmbtdLMXyHxdAuJCkuULrpEBcCp32aAsh7TW7IXVyqvx91RtEYzYhQDqFNQ_jxgv9XN5koTGSM4itZpmJZf'
  },
  {
    title: 'Cultural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gl9-ZbLd_93NbKa9IivxZJkOb-a7hKU2Z1S6XnAsWb8_RBBUyC-t53IYwDMz82J_XFEp_6PFFU0z73XmdyA68BJVtex-TLyjVl4eaR-qa1r-QKeSuafj66j1tfSzuNLcFDeefmfSWcjSSRhCwrmxJ7Q6PPQth2yE_CUCwiJBx9SWsVwJlwjX6NVlqSH5q9qTMQby7sHR_lssLVNfbpLwtC4-PmB9ytoMU924zBk_5q9Ry-aE-iGfGwtOJw033Z9xHDHY_LNu'
  },
  {
    title: 'Coastal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEGz_HJ3qbnWU20h96dwE78w2fSwSmgJye8IdTt9ez3kzry3IN4rbBc6p5_ckCBDUR8TVAjKleCBMiZsxaaWY0lXrlr0dYZ8oB9ILHHCkLEO9ghdkuGa8ILxU1y_H3QZVSNteruBbqiMyAU3sfWV6yQIAfFh50hQPN2NnydebLvh9mOz9TY_MznRoQgBBsqpP8RLjSIuyp6NOKkpYbo_eT8DByg1AAnBPfpISn8k7RUcHBxX1OiL9oQz_5qi8NufItIcRbkTZ'
  },
  {
    title: 'Wildlife',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9G35-DTlbhwu7fWAYKN6XzxgqI5ev4XeRlb1IstiwZEzjsfQI8L6yXcLW-DsVkS4_aZuUsEBSTVlSEI1nJLMx3o8ua4ZYrPw2GL78HEA4frRWcqkH8LtUbuA6h55dWbpVMQKSM8bqOuN78usE6HHgxYEfUbFQyeOddXBSBfCvkJ5Z79zf98qjdMCGA-VPI1xne72sK39T5TN7WuX9vcRSzqO38mobWdq43c-CDyxjT5PIN9yuGiVlspO0Xj4amIKxvzR2lDwp'
  }
];

export default function Categories() {
  return (
    <section className="pt-lg pb-md scroll-reveal overflow-hidden pl-4 md:pl-gutter max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-md pr-4 md:pr-gutter max-w-container-max mx-auto">
        <h2 className="font-headline-md text-headline-md text-primary">Explore by Category</h2>
        <Link
          className="font-label-md text-label-md text-secondary hover:text-secondary-container transition-colors flex items-center gap-1"
          href="/explore"
        >
          View all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar pr-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            className="snap-start shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            href="/explore"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url('${category.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-display-lg-mobile text-white drop-shadow-lg transform transition-transform duration-500 group-hover:translate-x-2">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
