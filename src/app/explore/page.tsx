import FilterSidebar from '@/components/explore/FilterSidebar';
import TourGrid from '@/components/explore/TourGrid';
import Pagination from '@/components/explore/Pagination';

export const metadata = {
  title: 'Explore - HuntersVilleTours',
  description: 'Discover curated adventures across East Africa.',
};

const tours = [
  {
    id: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7vsSD91kLxtFCl4XncmbCZunrQnpncVXsuwvGqC9otyeE_koPRDWBWncTpdRdmulIwPhb4dtQ4icd1TLzRNbN8JtBadflyv3Ue6Gx8Sccu65i4IWvRPorl4Ut1GysdTEuCxk1cbp0niBF6P00fPK6HkvcU6hZ3meylX7OnWhwW43Zcx8CmBffnzegxeiy_L69hmvD_UKglIdR-DpNDxK6lWJjI7M1UlmO20in3s7ykjZVgBVy8YbdZ0FBPudaGtJ8T30TaEnx',
    alt: 'A sweeping, majestic wide shot of a vast African savanna during golden hour. The landscape is bathed in warm, soft, earthy lighting that highlights a herd of elephants moving slowly across the tall, golden grass. In the background, an iconic flat-topped acacia tree is silhouetted against a vibrant, premium sunset sky. The mood is adventurous, serene, and sophisticated, perfectly suited for a high-end travel platform.',
    rating: '4.9',
    category: 'Safari',
    duration: '5 Days',
    location: 'Maasai Mara, Kenya',
    title: 'The Great Migration Luxury Safari',
    description: "Witness one of nature's greatest spectacles from the comfort of a premium tented camp with expert guides.",
    price: '$2,450'
  },
  {
    id: '2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYK_CZ4OwiLBVJJrXuoTd9EtvGyiaBFgOuED6Q99gA3cBPk12fS2o6gv74qjG3iPaUF18tT-pN7gZ4f3coJaxemnz_bxUyKcw_GgR_JCWcdRoPnPvEOMao7CTDipKsJYFYSjZX-o6nMrxeivc1LJAjgrf0df5gAgeYy4WDAqInN1-J-eh2b3cOCIt1iTNQ6kcuOr0OxmjftHJVzRjtw700UUwa_UG_BAG3KErGrcKHuRX3qUh_C98R_3_mJ7pxC2G9cKnmOkK4',
    alt: "A breathtaking, close-up view of Mount Kilimanjaro's snow-capped peak rising dramatically above a sea of clouds. The sky is a crisp, premium blue, providing a stunning contrast to the rugged, icy terrain. The lighting is bright and clear, highlighting the challenging yet inspiring nature of the hike. The image evokes a sense of epic adventure and authoritative exploration, fitting for a modern corporate travel aesthetic.",
    rating: '4.8',
    category: 'Hiking',
    duration: '7 Days',
    location: 'Mt. Kilimanjaro, Tanzania',
    title: 'Kilimanjaro Summit Machame Route',
    description: 'Conquer the roof of Africa via the scenic Machame route, known for its stunning views and high success rate.',
    price: '$1,890'
  },
  {
    id: '3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxmJZuJVbgIa6Wiyti5ZGQ2YDzDE4WA2v02Th8D6oaaaUIOl41XD4fKGv2tuWf_BP97PXMPZXz3hMIC4MzpsEEt_MOUXXIq1k6PrcxWAJ0VlKNw-I8TrawxVjyg742Soo00o7s_xzrBsbv8kU1VxTzTrIKzzOVKFxkTqt_GbiuQhtTbuWbiG1ti6h9Z2e2jXFkfi_hbhibwpbK3Ydmps7xN94f5hR9ALNzbWlq34_NsM0kzxgGe08L4gp_7ioVXgifOMHxjvFL',
    alt: 'A pristine, wide-angle shot of a serene beach in Zanzibar, featuring powdery white sand and impossibly clear, turquoise waters. A traditional wooden dhow boat floats gently in the calm sea under a bright, cloudless sky. The lighting is vibrant and sun-drenched, creating an atmosphere of ultimate relaxation and high-end coastal luxury. The aesthetic is clean, inviting, and sophisticated.',
    rating: '4.7',
    category: 'Coastal',
    duration: '3 Days',
    location: 'Zanzibar, Tanzania',
    title: 'Zanzibar Spice & Stone Town Retreat',
    description: 'Immerse yourself in the rich history of Stone Town and unwind on pristine, white-sand beaches.',
    price: '$650'
  },
  {
    id: '4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGBJsrn26mJdWlssUAlBW9Fuu76OtmXo8sdZ69xG4uccHZWsGWlGW9kwzma7x8A6fRsexHSNo9a9EqTMgEfIM__iNJTKrEePlRZ_FHel6Hm_TPHAaDVE90sW0DqTyGLXvZ24Og8l_uvK9SDcL3iZq-KcuTtSG_2Avot3XidYBmWY825K_kHJpwXVZcTLyNzdYpSGSuWSAsAzcXnutFwvKO5H9PaGSXOGYbbYRMf_ZVTJ9Lp-0px1NDyCRPFw9ZI0G0zWiui23x',
    alt: "A compelling, close-up portrait shot of a mountain gorilla in a lush, dense, emerald-green jungle setting. The lighting is dappled and moody, filtering through the thick canopy to highlight the texture of the gorilla's fur and expressive eyes. The mood is intimate, authoritative, and awe-inspiring. The scene feels like a high-end editorial nature photograph, perfectly aligned with a premium travel adventure brand.",
    rating: '5.0',
    category: 'Wildlife',
    duration: '4 Days',
    location: 'Bwindi, Uganda',
    title: 'Gorilla Trekking Expedition',
    description: 'A once-in-a-lifetime journey into the impenetrable forest to encounter majestic mountain gorillas in their natural habitat.',
    price: '$3,100'
  }
];

export default function ExplorePage() {
  return (
    <div className="flex flex-1 mb-16 pt-[120px] max-w-container-max mx-auto w-full px-gutter md:px-lg gap-lg">
      <FilterSidebar />

      <main className="flex-1 pb-xl">
        <div className="mb-md flex justify-between items-end">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-xs">Explore Experiences</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Discover curated adventures across East Africa.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Sort by:</span>
            <select className="bg-transparent border-none text-on-background font-label-md text-label-md focus:ring-0 cursor-pointer outline-none">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
        </div>

        <TourGrid tours={tours} />
        <Pagination />
      </main>
    </div>
  );
}
