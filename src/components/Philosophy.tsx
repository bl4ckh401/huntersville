export default function Philosophy() {
  return (
    <section className="max-w-container-max mx-auto px-gutter pt-lg pb-md scroll-reveal">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Our Philosophy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            We believe that travel should be transformative, not just transactional. Our commitment is to curate sustainable, profound experiences that connect you deeply with the landscapes, wildlife, and cultures of East Africa.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Every journey we craft is a testament to our respect for the environment and local communities, ensuring your adventure leaves a positive legacy.
          </p>
          <button className="mt-8 border-b-2 border-primary text-primary font-label-md text-label-md pb-1 hover:text-primary-container hover:border-primary-container transition-colors">
            Discover Our Impact
          </button>
        </div>
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuKdNTXWAc23rxSxyGsyShAxkN4GqhQFvfZWPsZ__1I6VygOn9rgEtr8aT3j1Pgih-NXvFyegBxQcuwGILmz7Ee_EYcTr7woUKMzFf36YGbyOe49G5Ah3YgUvSgMHXSHa_P-xlc4kdxUpLfP78cLOO6eMC2U6055OTaPWBfN2uC3-FrLO_iLcBVMPlleP1pWoDxiXabNjDRV3wiotY7S5Pqyx81f8huReV7LAWM-xePcSy7tj0qHOqIyaCUHtJqljgmkBzT74938w')" }}
          />
        </div>
      </div>
    </section>
  );
}
