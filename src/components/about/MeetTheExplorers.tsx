import Image from "next/image";

const team = [
  {
    name: 'Jimmy Lee',
    role: 'Co-Founder/CEO',
    bio: 'Pioneering luxury tourism with a lifelong dedication to preserving Kenya\'s heritage.',
    image: '/lee.jpeg',
    delay: 0,
    objectPosition: '50% 20%',
  },
  {
    name: 'Godwin Kiprono',
    role: 'Co-Founder/Investor',
    bio: 'A visionary investor and co-founder, committed to driving innovation in the tourism industry.',
    image: '/gkk.jpeg',
    delay: 100,
    objectPosition: 'center',
  },
  {
    name: 'Pavin Kiptoo',
    role: 'Developer',
    bio: 'A tech enthusiast and developer, passionate about creating seamless digital experiences for travelers.',
    image: '/pkk.jpg',
    delay: 200,
    objectPosition: 'center',
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
              <div className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 relative">
                <Image
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover transition-all duration-500"
                  style={{ objectPosition: member.objectPosition }}
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
