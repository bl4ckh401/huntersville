export interface GalleryFrame {
  id: number;
  album: string;
  headline: string;
  count: string;
  location: string;
  naturalist: string;
  optics: string;
  desc: string;
  src: string;
  alt: string;
  tags: string[];
  category: 'wildlife' | 'lodges' | 'aerial' | 'culture' | 'coastal';
  sanctuary: string;
  featured: boolean;
  time: string;
  span: 'wide' | 'portrait' | 'standard' | 'endcap';
}

export interface GalleryAlbum {
  id: number;
  title: string;
  subtitle: string;
  region: string;
  frames: number;
  fieldLead: string;
  src: string;
  alt: string;
  frameIndex: number;
}

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 1,
    album: 'The Great Serengeti & Mara Migration',
    headline: 'Hot Air Balloon Dawn over Mara River Basin',
    count: 'Frame 1 of 9',
    location: 'Mara Triangle, Kenya',
    naturalist: 'Jackson Ole Meto',
    optics: '50mm f/1.8 • ISO 200',
    desc: 'Ascending before twilight into thermal drafts above the Mara Triangle. As sunlight breaches the escarpment, migrating herds organize into flowing ribbon currents toward fresh grazing pastures.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1X8t_tB8Qori2UXkbmHsV-brUA2yMm2yHvu1MtZ9Ucw0idBTz0FqnhU0fEowR2qa8uguaSDO7Q19xx27g58TNtXyo_7xLhGMl5YMgvCv2LkWfSxsPvaAYTaZNMJGLjfyS8Z8hTIEgw3UA_bEVVYCAdnVEvU6JyuMHxY8s-Nzz2OudXOzOgFAzrqgMvlkWQJW56dagao_1kDQlsa1Tg0W7Sl-l2BYtFEvGBMWVsN_7FXrMqHRXfnTnBP',
    alt: 'Hot air balloon dawn over the Mara River Basin',
    tags: ['Maasai Mara', 'Aerial Safari'],
    category: 'aerial',
    sanctuary: 'Maasai Mara',
    featured: true,
    time: '06:15 AM • 1,000 FT AGL',
    span: 'wide',
  },
  {
    id: 2,
    album: 'Amboseli Giants in the Shadow of Kilimanjaro',
    headline: 'Matriarch & Elephant Herd under Kili',
    count: 'Frame 2 of 9',
    location: 'Amboseli Basin, Kenya',
    naturalist: 'Amina Mwangi',
    optics: '85mm f/1.4 • ISO 100',
    desc: 'An ancient elephant matriarch guides her extended multigenerational family across the dusty alkaline flats as Mount Kilimanjaro snowcaps emerge in early golden light.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1VLd-sBV5eu8mKAbMaf1xVMFsA-2V5mDl5dLcyYahbScFt_d0Bu5Oi-ormVV31EgNx_llexZSIGEsaXy6d8YS4rbi9PSgGFmEkuWk76NMba0fEb-Bbf1AJMJunpDTJm4urEaX2Na2bkQDrOH_xWS2fpVGZGWgfcKMWTZ-RMyLXqXtHE_j73xzV94_IXCtj5lVLEnTuw-9Oa8Rq573j70NIu8NneW5p5XuEzJvZ5V2dvmrJj2RgmA0IF',
    alt: 'Amboseli matriarch and elephant herd under Kilimanjaro',
    tags: ['Amboseli', 'Wildlife'],
    category: 'wildlife',
    sanctuary: 'Amboseli',
    featured: true,
    time: 'Kilimanjaro Foothills',
    span: 'portrait',
  },
  {
    id: 3,
    album: 'Predators of the Acacia Plains',
    headline: 'Cheetah Sentinel on Termite Mound',
    count: 'Frame 3 of 9',
    location: 'Samburu National Reserve, Kenya',
    naturalist: 'Derrick Kiprono',
    optics: '400mm f/2.8 • ISO 400',
    desc: "Surveying the open grassland for Thomson's gazelles. The vantage point of the red clay mound offers 360-degree clarity across the shimmering acacia plains.",
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1XPIdCwaCwNU1QwQIc3Tvn0ShVau0gwGt-9LejRf-IfC0-EUyPQqt1HrMo8_4gtH4CQy4IXj_5yYFF8aW-yR4e9ZzfT_owsKW_-0jCmPq7gg8PLN8LTX_GPzmcTFkil5wmAsKtT7UyPlPff85pNtucJHbJRdOoqC5tAMUfRmjlAfYEo6nJ86SITCJnKC5EqhiiW3bW0HG5IUi-E7EqpnDafj0m63EONZw3JfY-icPOajsfaixXxL0cV',
    alt: 'Cheetah sentinel on a termite mound',
    tags: ['Samburu', 'Predators'],
    category: 'wildlife',
    sanctuary: 'Samburu',
    featured: true,
    time: 'Golden Hour Stalk',
    span: 'standard',
  },
  {
    id: 4,
    album: 'Wild Luxury: Sanctuary Tented Camps',
    headline: 'Private Veranda Sunset Lounge',
    count: 'Frame 4 of 9',
    location: 'Mara North Conservancy',
    naturalist: 'Elena Vance (Architectural Archivist)',
    optics: '24mm f/1.4 • ISO 320',
    desc: 'Expansive private timber deck with canvas roll-downs overlooking a natural animal trail at dusk, blending refined organic luxury with undisturbed wilderness.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1XvQ3nUZLECzlzj8Y9ybn1l-xw-lUOUYwKqGr_KxnLL4_btd2-YQZYuagGVm_9oqa7V5YJnIvCYGYQJMNSUIPYqQFmpN1bpARR6QxysG6xIfcCR7hRGjPrVStpq18xFPJRJkn8xQTXz_iLsZM2V5OV8l-T3HbPqvZ-_jp5tvZMLnPU2G_NKKXtCwzw6OOU-DCqWteDu8tR8TMTuf3nU2yJlwjMPW2AGTfA9a5ASTnuCrVK-f0SCygY',
    alt: 'Luxury tented safari lodge veranda at sunset',
    tags: ['Mara Conservancy', 'Camp & Lodge'],
    category: 'lodges',
    sanctuary: 'Maasai Mara',
    featured: true,
    time: 'Bush Sanctuary',
    span: 'standard',
  },
  {
    id: 5,
    album: 'Diani & Swahili Marine Wilderness',
    headline: 'Dhow Over Turquoise Coral Key',
    count: 'Frame 5 of 9',
    location: 'Diani Marine Reserve, Indian Ocean',
    naturalist: 'Hamisi Juma',
    optics: '35mm f/2.0 • ISO 64',
    desc: 'A hand-hewn mahogany dhow cuts through crystalline coral shallows, navigating ancient Swahili currents between offshore sandbars and palm shores.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1WBYHh2qyu_71SAZEoM_OZrWsY9hIuPkXj1rRu2Drw9EO4QayINW5kb6_DLf2l_SE_bOBEzvJwg_dPNJfs9VFaxFv8m6GdVEE_y6gsAm8KfhcES_1HHajl1Jr3Fh9V98HcohtbuWnccAC9oyQMGM1cKOszHVizfNIxCq4OWpCB9wMq5OiyWIhqAExCgcytdjr9MlEdiL07EvatmeAhxnV10-R2ymyjHsURarFqlicADZsC1-SgBqL8',
    alt: 'Diani beach coral reef and dhow',
    tags: ['Diani Reef', 'Coastal'],
    category: 'coastal',
    sanctuary: 'Diani Beach',
    featured: true,
    time: 'Swahili Archipelago',
    span: 'standard',
  },
  {
    id: 6,
    album: 'Escarpment & Rift Valley Sunsets',
    headline: 'Rift Escarpment Expedition Sundowner',
    count: 'Frame 6 of 9',
    location: 'Great Rift Valley Ridge, Kenya',
    naturalist: 'Jackson Ole Meto',
    optics: '16-35mm f/2.8 • ISO 160',
    desc: 'Gathering alongside custom land cruisers on the 2,000-foot escarpment rim as the African sun paints volcanic ridges in copper and amber violet.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1X1ld45eE48ao1YZYqX2AUxkE7e4X5Z13VoUcpjvoOuq26sx5QsTU85KePMrv2QhAfJ3rhBQwbPmdUMVvAKZSOCSWMM9LamOzk_XEyfmYgHpL5Bg0H-x6xxEoAcmDd8v9GBJIgTQ39HymFUtA7WmEMq7IsNGUvvTZoIhuMen4ZkkgfxzSzblupaB8POvMN4yl-VSOLAUVhzh4WGrsTB2IC2U12aGX9AgmRNFYAA_RfUsyQVlORPqeJJ',
    alt: 'Great Rift Valley sundowner from the escarpment',
    tags: ['Great Rift Valley', 'Panoramic Sunset'],
    category: 'aerial',
    sanctuary: 'Rift Valley',
    featured: true,
    time: 'Escarpment Viewpoint',
    span: 'wide',
  },
  {
    id: 7,
    album: 'Alpine Expeditions & Mount Kenya',
    headline: 'Peak Above Equatorial Clouds',
    count: 'Frame 7 of 9',
    location: 'Point Lenana, Mount Kenya',
    naturalist: 'Kipchoge Nderitu',
    optics: '28mm f/3.5 • ISO 100',
    desc: 'Alpine climbers greet equatorial sunrise at nearly 5,000 meters altitude above an undulating ocean of morning stratocumulus clouds.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1WkMf5Oo01AJoiVGlYDF3inmjDySR0L0JVqA8r2IGZbGk08ieYi1HguqDDQsEvLJxXZqmccce7fyzbV_CK2rgQeOOoV0VjuULArdyAKW4yQgnseOBMCnZntyNp0o4ypk14UwK2DfJTA6WVfn9KoKRAChEzZCP1Je5Li6LVycW_kKAIbDxW6Gw3xRtJvLA8PXZPcH41k2k-5z42noUjdsBuOXK8Tmrys4K0Xt6-deS0S4NbznMxBbjwa',
    alt: 'Mount Kenya alpine peak above equatorial clouds',
    tags: ['Alpine Peaks'],
    category: 'aerial',
    sanctuary: 'Mount Kenya',
    featured: false,
    time: 'Point Lenana (4,985m)',
    span: 'standard',
  },
  {
    id: 8,
    album: 'Sacred Heritage & Horn Civilizations',
    headline: 'Sacred Rock-Hewn Sanctuary',
    count: 'Frame 8 of 9',
    location: 'Northern Highland Sanctuaries',
    naturalist: 'HuntersVille Heritage Unit',
    optics: '35mm f/1.4 • ISO 800',
    desc: 'Shafts of mystical morning light illuminate sacred stone sanctuaries carved directly into living mountain bedrock centuries ago.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1W4L1_Drk8pvNRQt1GE3SaZx8RVmn0DuYx9j7bJC_q7049bO_7Xlg7dTJFeZk_fbAdY0mTYDAGwZSy-U_2uJ49utbAg88JzO6xXOn96LaxMJ9klvM5SjZLivUsQdMphT8XKoR-9fe1usGS2tecDAahPWxmebH5pxtE12TajsrXkpDFidjjPy-SgSp3DzsBWRvfsyATIQmZ5w8vzVMlsBynpH2qUaM7fw9nXWgpMdZgzLn0xNWxkpfs',
    alt: 'Sacred rock-hewn heritage sanctuary',
    tags: ['Heritage & Faith'],
    category: 'culture',
    sanctuary: 'Northern Highlands',
    featured: false,
    time: 'Highland Monolith',
    span: 'standard',
  },
  {
    id: 9,
    album: 'Ancient Mist Forest & Primates',
    headline: 'Living Forest Wall & Canopy Immersion',
    count: 'Frame 9 of 9',
    location: 'Montane Cloud Sanctuary',
    naturalist: 'Dr. Rachel Kirui',
    optics: '70-200mm f/2.8 • ISO 640',
    desc: 'Tracking family bands through virgin moss-draped cloud forest, recording undisturbed primate behaviors amidst ancient equatorial flora.',
    src: 'https://lh3.googleusercontent.com/aida/AEtjO1XWEpayKWGARCUm4Xys7pMkst0vbFQy2csdr59kswGiJ9GRxG1OCq_gQ7AyFj0-YJfK7QzrFX-ehwxXtbImPD2cCigMYlQ-Ba9q87ew6Kd8XOx1w_JoSwO7PewxPzyI-QWhK6GFF_McIlwmM0aG1R49piT8dRrl64fjUYx3BJzipBSiBGNETDfujrEeeQxolAGiLBK4iBDsYdHljAiRpoK1aPbi0MDY7vKHrPi_dXtgPHBKAjsKN2NR',
    alt: 'Equatorial forest canopy and primate wildlife',
    tags: ['Ancient Mist Forest', 'Regenerative Conservation Reserve'],
    category: 'wildlife',
    sanctuary: 'Cloud Forest',
    featured: false,
    time: 'Dispatch Ref: #EXP-2025-084',
    span: 'endcap',
  },
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 1,
    title: 'The Great Serengeti & Mara Migration',
    subtitle: 'Seasonal River Crossings',
    region: 'Kenya & Tanzania',
    frames: 34,
    fieldLead: 'Jackson Ole Meto',
    src: GALLERY_FRAMES[0].src,
    alt: GALLERY_FRAMES[0].alt,
    frameIndex: 0,
  },
  {
    id: 2,
    title: 'Amboseli Giants in the Shadow of Kilimanjaro',
    subtitle: 'Pachyderm Patriarchs',
    region: 'Amboseli Basin',
    frames: 28,
    fieldLead: 'Amina Mwangi',
    src: GALLERY_FRAMES[1].src,
    alt: GALLERY_FRAMES[1].alt,
    frameIndex: 1,
  },
  {
    id: 3,
    title: 'Predators of the Acacia Plains',
    subtitle: 'Big Cats & Canids',
    region: 'Samburu & Mara',
    frames: 42,
    fieldLead: 'Derrick Kiprono',
    src: GALLERY_FRAMES[2].src,
    alt: GALLERY_FRAMES[2].alt,
    frameIndex: 2,
  },
  {
    id: 4,
    title: 'Wild Luxury: Sanctuary Tented Camps',
    subtitle: 'Architecture of Solitude',
    region: 'Private Conservancies',
    frames: 26,
    fieldLead: 'Elena Vance',
    src: GALLERY_FRAMES[3].src,
    alt: GALLERY_FRAMES[3].alt,
    frameIndex: 3,
  },
  {
    id: 5,
    title: 'Diani & Swahili Marine Wilderness',
    subtitle: 'Coral Atolls & Dhows',
    region: 'Indian Ocean',
    frames: 19,
    fieldLead: 'Hamisi Juma',
    src: GALLERY_FRAMES[4].src,
    alt: GALLERY_FRAMES[4].alt,
    frameIndex: 4,
  },
  {
    id: 6,
    title: 'Escarpment & Rift Valley Sunsets',
    subtitle: 'Geological Horizons',
    region: 'Great Rift Valley',
    frames: 31,
    fieldLead: 'Jackson Ole Meto',
    src: GALLERY_FRAMES[5].src,
    alt: GALLERY_FRAMES[5].alt,
    frameIndex: 5,
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photographs', count: 164 },
  { id: 'wildlife', label: 'Wildlife & Safaris', count: 68 },
  { id: 'lodges', label: 'Luxury Lodges', count: 24 },
  { id: 'aerial', label: 'Aerial & Landscapes', count: 41 },
  { id: 'culture', label: 'Cultural & Heritage', count: 18 },
  { id: 'coastal', label: 'Coastal Waters', count: 13 },
] as const;

export const GALLERY_SANCTUARIES = [
  'All Reserves',
  'Maasai Mara',
  'Amboseli',
  'Samburu',
  'Diani Beach',
  'Rift Valley',
] as const;
