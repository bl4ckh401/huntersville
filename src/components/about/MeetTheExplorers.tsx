import Image from "next/image";

const team = [
  {
    name: 'Jimmy Lee',
    role: 'Founder & Visionary',
    bio: 'Pioneering luxury eco-tourism with a lifelong dedication to preserving Kenya\'s heritage.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBahsDQILuG5f8T9FT54uAjc_smSmv5VaZDs9_Li07Q1T8k4mFg9L4xTNjftArBi-RGeslhr8TMkpg6v-8SVBY8U4qPZECJOZ_Zb87phXmt2dOiT0yIQql3M1ttaioMR_PtvIsfAkwgPZHM8L0YMmRHv6ZTRCN2vyRno0B8gATcLZxCJc7TG-oHOgdQ0iCeE812r6pF2uKxvCtYYKC0BtpIUWHzGPNXqIG0dw84RdmMZ-cW5zuatvgN8wJeLapHQL79r1CNdzXK',
    delay: 0,
  },
  {
    name: 'Godwin Kiprono',
    role: 'Head of Conservation',
    bio: 'Leading our community and wildlife initiatives to ensure a sustainable footprint.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdHtQFAcizwvCYakb4I-NfOn-vxS4WHQmVk2Y1ffVCqH49_hwFtv8MZEV7KGSBEtmzfuCj5ZBEAhum3g9DCrLjFQNKyWNjLK-xXtXB7WzEU0ziZx5396EN33P-hietp-VIhCQF3BviXuWn8DeyyZWXcb0MXVz-74j-H6T3wQJiQlYjYkW53mkLwXIlMy2eRqAK5sPoTwaVh3JibwzWp2JKPGDz3dJ5TfeHme47jTQEtvwI1htfEWcE0RRkyKdOlaujoR4sSuc',
    delay: 100,
  },
  {
    name: 'Pavin Kiptoo',
    role: 'Developer',
    bio: 'A master tracker whose intimate knowledge of the Mara brings every safari to life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7iganT-loSADw8alA8Ul_AdqkXRSEcSccNzOrNBSqtEm7_U9DZTXoBceT_9oGcH7gvFt8PTWUDzePzlM53w5mAdjTFJhcCZwtjL57ZHlvdLzXjyNr0weJ5DK_ox0_TQreECFALZaknIWdbc34XcW5j01mqxi-WegFEOQcBUI3U9deZBgcxHTWXBT43IpDOlJ6HJAAif2AUAg-fW7ZSZ-LB6BdBC2JbnAjB1qytiLW9-m961j8RUhwzx97Nkk_eKOEed-NkVxa',
    delay: 200,
  },
];

export default function MeetTheExplorers() {
  return (
    <section className="py-24 px-gutter bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <span className="font-label-md text-label-md text-surface-tint uppercase tracking-widest mb-4 block">
            Our Team
          </span>
          <h2 className="font-headline-md text-[32px] md:text-[44px] text-primary">Meet the Explorers</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
            The visionaries and experts who craft your unparalleled journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((member) => (
            <div
              key={member.name}
              className="text-center group scroll-reveal"
              style={{ transitionDelay: `${member.delay}ms` }}
            >
              {/* Portrait */}
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  alt={member.name}
                  width={1080}
                  height={1920}
                  className="w-full h-full object-cover transition-all duration-500"
                  src={member.image}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>

              {/* Info */}
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{member.name}</h3>
              <p className="font-label-sm text-label-sm text-surface-tint uppercase tracking-wider mb-4">{member.role}</p>
              <p className="font-body-md text-body-md text-on-surface-variant px-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
