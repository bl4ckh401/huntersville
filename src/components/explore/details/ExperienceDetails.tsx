import type { Experience, Review } from '@/lib/content-store';
import TourHeader from './TourHeader';
import Reviews from './Reviews';
import {
  Section,
  RichText,
  FactGrid,
  CheckList,
  Card,
  PillRow,
  hasText,
  isYes,
  type Fact,
} from './primitives';

interface ExperienceDetailsProps {
  experience: Experience;
  reviews: Review[];
  average: number;
  reviewsCount: number;
}

/* Turn "Yes" / "No" / free text into a readable value, dropping empties. */
function meal(label: string, value: string): Fact {
  return { label, value, icon: 'restaurant' };
}

export default function ExperienceDetails({ experience, reviews, average, reviewsCount }: ExperienceDetailsProps) {
  const {
    durationDetails,
    pricing,
    groupDetails,
    availability,
    pickup,
    accommodation,
    meals,
    tourGuide,
    cancellationPolicy,
    contactInfo,
    legal,
    bookingInfo,
    locationInfo,
  } = experience;

  const ratingLabel = average ? average.toFixed(1) : '5.0';

  /* ---- Header meta chips ---- */
  const meta: { icon: string; value: string }[] = [
    { icon: 'schedule', value: durationDetails.totalDuration || experience.duration },
    { icon: 'groups', value: experience.experienceType },
    { icon: 'translate', value: (experience.languages || []).join(', ') },
    { icon: 'wb_sunny', value: experience.bestTimeToVisit },
  ].filter((item) => item.value && item.value.trim());

  const headerTags = Array.from(
    new Set([...(experience.categoryTags || []), ...(experience.interests || [])].filter(Boolean)),
  ).slice(0, 8);

  /* ---- Fact groups ---- */
  const goodToKnow: Fact[] = [
    { label: 'Destination', value: experience.destination, icon: 'public' },
    { label: 'Region', value: experience.region, icon: 'map' },
    { label: 'City / town', value: experience.city, icon: 'location_city' },
    { label: 'Meeting point', value: experience.meetingPoint, icon: 'pin_drop' },
    { label: 'Ending point', value: experience.endingPoint, icon: 'flag' },
    { label: 'Target audience', value: experience.targetAudience, icon: 'diversity_3' },
  ];

  const durationFacts: Fact[] = [
    { label: 'Total duration', value: durationDetails.totalDuration, icon: 'schedule' },
    { label: 'Days', value: durationDetails.numberOfDays, icon: 'calendar_today' },
    { label: 'Nights', value: durationDetails.numberOfNights, icon: 'bedtime' },
    { label: 'Start time', value: durationDetails.startTime, icon: 'wb_twilight' },
    { label: 'End time', value: durationDetails.endTime, icon: 'nightlight' },
  ];

  const groupFacts: Fact[] = [
    { label: 'Minimum guests', value: groupDetails.minimumGuests, icon: 'person' },
    { label: 'Maximum guests', value: groupDetails.maximumGuests, icon: 'groups' },
    { label: 'Age restrictions', value: groupDetails.ageRestrictions, icon: 'elderly' },
    { label: 'Children allowed', value: groupDetails.childrenAllowed, icon: 'child_care' },
    { label: 'Pets allowed', value: groupDetails.petsAllowed, icon: 'pets' },
  ];

  const availabilityFacts: Fact[] = [
    { label: 'Available dates', value: availability.availableDates, icon: 'event_available' },
    { label: 'Recurring schedule', value: availability.recurringSchedule, icon: 'event_repeat' },
    { label: 'Blackout dates', value: availability.blackoutDates, icon: 'event_busy' },
    { label: 'Booking deadline', value: availability.bookingDeadline, icon: 'hourglass_bottom' },
    { label: 'Cut-off before departure', value: availability.cutOffTime, icon: 'timer' },
  ];

  const pickupFacts: Fact[] = [
    { label: 'Pickup available', value: pickup.pickupAvailable, icon: 'directions_car' },
    { label: 'Transport type', value: pickup.transportType, icon: 'airport_shuttle' },
    { label: 'Pickup locations', value: pickup.pickupLocations, icon: 'my_location' },
    { label: 'Drop-off locations', value: pickup.dropOffLocations, icon: 'where_to_vote' },
    { label: 'Accessibility', value: pickup.accessibility, icon: 'accessible' },
  ];

  const accommodationFacts: Fact[] = [
    { label: 'Included', value: accommodation.included, icon: 'hotel' },
    { label: 'Name', value: accommodation.name, icon: 'apartment' },
    { label: 'Type', value: accommodation.type, icon: 'cottage' },
    { label: 'Star rating', value: accommodation.starRating ? `${accommodation.starRating} star` : '', icon: 'star' },
    { label: 'Room type', value: accommodation.roomType, icon: 'king_bed' },
    { label: 'Sharing options', value: accommodation.sharingOptions, icon: 'group' },
    { label: 'Check-in', value: accommodation.checkInTime, icon: 'login' },
    { label: 'Check-out', value: accommodation.checkOutTime, icon: 'logout' },
  ];

  const mealFacts: Fact[] = [
    meal('Breakfast', meals.breakfastIncluded),
    meal('Lunch', meals.lunchIncluded),
    meal('Dinner', meals.dinnerIncluded),
    meal('Snacks', meals.snacksIncluded),
    meal('Drinks', meals.drinksIncluded),
    { label: 'Dietary accommodations', value: meals.dietaryAccommodations, icon: 'nutrition' },
  ];

  const pricingFacts: Fact[] = [
    { label: 'Adult', value: pricing.adultPrice, icon: 'person' },
    { label: 'Child', value: pricing.childPrice, icon: 'child_care' },
    { label: 'Infant', value: pricing.infantPrice, icon: 'stroller' },
    { label: 'Senior', value: pricing.seniorPrice, icon: 'elderly' },
    { label: 'Private group', value: pricing.privateGroupPrice, icon: 'groups' },
    { label: 'Service fees', value: pricing.serviceFees, icon: 'receipt_long' },
    { label: 'Discounts', value: pricing.discounts, icon: 'sell' },
    { label: 'Extra charges', value: pricing.extraCharges, icon: 'add_card' },
    { label: 'Taxes included', value: pricing.taxesIncluded, icon: 'account_balance' },
    { label: 'Deposit required', value: pricing.depositRequired, icon: 'savings' },
  ];

  const contactFacts: Fact[] = [
    { label: 'Business name', value: contactInfo.businessName, icon: 'business' },
    { label: 'Phone', value: contactInfo.phone, icon: 'call' },
    { label: 'Email', value: contactInfo.email, icon: 'mail' },
    { label: 'Website', value: contactInfo.website, icon: 'language' },
    { label: 'Address', value: contactInfo.businessAddress, icon: 'location_on' },
  ];

  const legalFacts: Fact[] = [
    { label: 'Business registration', value: legal.businessRegistration, icon: 'verified' },
    { label: 'Tour operator license', value: legal.tourOperatorLicense, icon: 'badge' },
    { label: 'Tax information', value: legal.taxInfo, icon: 'receipt' },
    { label: 'Liability insurance', value: legal.liabilityInsurance, icon: 'health_and_safety' },
  ];

  const socialLinks = (contactInfo.socialMedia || '')
    .split(/\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const hasFacts = (facts: Fact[]) => facts.some((fact) => hasText(fact.value));

  const overview = hasText(experience.description) ? experience.description : experience.summary;

  return (
    <div className="space-y-lg">
      <TourHeader
        title={experience.title}
        category={experience.category}
        location={experience.location}
        rating={ratingLabel}
        reviewsCount={reviewsCount}
        tagline={experience.tagline || experience.summary}
        meta={meta}
        tags={headerTags}
      />

      {/* Overview */}
      {hasText(overview) ? (
        <Section icon="description" title="Overview">
          <RichText html={overview} />
        </Section>
      ) : null}

      {/* What makes it unique */}
      {hasText(experience.uniqueSellingPoint) ? (
        <Section icon="auto_awesome" title="What makes this special">
          <Card className="border-primary/20 bg-primary-container/10">
            <RichText html={experience.uniqueSellingPoint} />
          </Card>
        </Section>
      ) : null}

      {/* Highlights */}
      {experience.highlights?.length ? (
        <Section icon="bolt" title="Highlights">
          <CheckList items={experience.highlights} />
        </Section>
      ) : null}

      {/* What guests can expect */}
      {experience.guestExpectations?.length ? (
        <Section icon="visibility" title="What to expect">
          <CheckList items={experience.guestExpectations} variant="neutral" />
        </Section>
      ) : null}

      {/* Good to know */}
      {hasFacts(goodToKnow) ? (
        <Section icon="info" title="Good to know">
          <FactGrid facts={goodToKnow} columns={2} />
        </Section>
      ) : null}

      {/* Duration & schedule */}
      {hasFacts(durationFacts) ? (
        <Section icon="event" title="Duration & schedule">
          <FactGrid facts={durationFacts} columns={3} />
        </Section>
      ) : null}

      {/* Itinerary */}
      {experience.itinerary?.length ? (
        <Section icon="route" title="Itinerary">
          <div className="space-y-md border-l-2 border-outline-variant/60 pl-5 sm:pl-6">
            {experience.itinerary.map((item, index) => (
              <div key={`${item.day}-${index}`} className="relative">
                <span
                  className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-[3px] bg-surface sm:-left-[30px] ${
                    index === experience.itinerary.length - 1 ? 'border-outline' : 'border-primary'
                  }`}
                />
                <Card>
                  <div className="mb-xs flex flex-wrap items-center gap-2">
                    <h3 className="font-title-md text-title-md text-on-surface">
                      {[item.day, item.title].filter(Boolean).join(': ')}
                    </h3>
                    {item.time ? (
                      <span className="rounded-full bg-surface-container px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">
                        {item.time}
                      </span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{item.description}</p>
                  ) : null}
                  {item.location ? (
                    <span className="mt-sm inline-flex items-center gap-xs rounded-full bg-surface-container px-sm py-xs font-label-sm text-label-sm text-on-surface">
                      <span className="material-symbols-outlined text-[16px]">location_on</span> {item.location}
                    </span>
                  ) : null}
                </Card>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Included / not included */}
      {experience.included?.length || experience.notIncluded?.length ? (
        <Section icon="checklist" title="What's included">
          <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
            {experience.included?.length ? (
              <div>
                <h3 className="mb-sm font-title-md text-title-md text-on-surface">Included</h3>
                <CheckList items={experience.included} columns={1} />
              </div>
            ) : null}
            {experience.notIncluded?.length ? (
              <div>
                <h3 className="mb-sm font-title-md text-title-md text-on-surface">Not included</h3>
                <CheckList items={experience.notIncluded} variant="negative" columns={1} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* Meals */}
      {hasFacts(mealFacts) ? (
        <Section icon="restaurant" title="Meals & dining">
          <FactGrid facts={mealFacts} columns={3} />
        </Section>
      ) : null}

      {/* Accommodation */}
      {hasFacts(accommodationFacts) ? (
        <Section icon="hotel" title="Accommodation">
          <FactGrid facts={accommodationFacts} columns={2} />
        </Section>
      ) : null}

      {/* Pickup & transport */}
      {hasFacts(pickupFacts) ? (
        <Section icon="directions_car" title="Pickup & transportation">
          <FactGrid facts={pickupFacts} columns={2} />
        </Section>
      ) : null}

      {/* Group details */}
      {hasFacts(groupFacts) ? (
        <Section icon="group" title="Group & guests">
          <FactGrid facts={groupFacts} columns={3} />
        </Section>
      ) : null}

      {/* Availability */}
      {hasFacts(availabilityFacts) ? (
        <Section icon="event_available" title="Availability">
          <FactGrid facts={availabilityFacts} columns={2} />
        </Section>
      ) : null}

      {/* Requirements / bring / safety / accessibility */}
      {experience.requirements?.length ? (
        <Section icon="fact_check" title="Requirements">
          <CheckList items={experience.requirements} variant="neutral" />
        </Section>
      ) : null}

      {experience.whatToBring?.length ? (
        <Section icon="backpack" title="What to bring">
          <CheckList items={experience.whatToBring} variant="neutral" />
        </Section>
      ) : null}

      {experience.safety?.length ? (
        <Section icon="health_and_safety" title="Safety guidelines">
          <CheckList items={experience.safety} />
        </Section>
      ) : null}

      {experience.accessibility?.length ? (
        <Section icon="accessible" title="Accessibility">
          <CheckList items={experience.accessibility} variant="neutral" />
        </Section>
      ) : null}

      {/* Tour guide */}
      {hasText(tourGuide.guideName) || hasText(tourGuide.biography) ? (
        <Section icon="badge" title="Your guide">
          <Card>
            <div className="flex flex-col gap-md sm:flex-row sm:items-start">
              {tourGuide.profilePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tourGuide.profilePhoto}
                  alt={tourGuide.guideName || 'Guide'}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined text-[32px]">person</span>
                </span>
              )}
              <div className="min-w-0 flex-1">
                {tourGuide.guideName ? (
                  <h3 className="font-title-md text-title-md text-on-surface">{tourGuide.guideName}</h3>
                ) : null}
                <div className="mt-xs flex flex-wrap gap-x-md gap-y-1 font-label-sm text-label-sm text-on-surface-variant">
                  {tourGuide.yearsOfExperience ? (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                      {tourGuide.yearsOfExperience} yrs experience
                    </span>
                  ) : null}
                  {tourGuide.languagesSpoken ? (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">translate</span>
                      {tourGuide.languagesSpoken}
                    </span>
                  ) : null}
                </div>
                {hasText(tourGuide.biography) ? <RichText className="mt-sm" html={tourGuide.biography} /> : null}
                <div className="mt-sm">
                  <FactGrid
                    facts={[
                      { label: 'Certifications', value: tourGuide.certifications, icon: 'verified' },
                      { label: 'Licenses', value: tourGuide.licenses, icon: 'badge' },
                      { label: 'Contact', value: tourGuide.contactInfo, icon: 'call' },
                    ]}
                    columns={1}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Section>
      ) : null}

      {/* Location */}
      {hasText(locationInfo.meetingInstructions) ||
      hasText(locationInfo.nearbyLandmarks) ||
      hasText(locationInfo.googleMapsLink) ? (
        <Section icon="place" title="Location & meeting point">
          {hasText(locationInfo.meetingInstructions) ? (
            <RichText className="mb-sm" html={locationInfo.meetingInstructions} />
          ) : null}
          <FactGrid
            facts={[
              { label: 'Nearby landmarks', value: locationInfo.nearbyLandmarks, icon: 'landscape' },
              { label: 'Coordinates', value: experience.coordinates, icon: 'my_location' },
            ]}
            columns={2}
          />
          {hasText(locationInfo.googleMapsLink) ? (
            <a
              href={locationInfo.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="mt-sm inline-flex items-center gap-xs rounded-full bg-primary px-md py-sm font-label-md text-label-md text-on-primary transition-colors hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-[18px]">map</span> Open in Google Maps
            </a>
          ) : null}
        </Section>
      ) : null}

      {/* Pricing */}
      {hasFacts(pricingFacts) ? (
        <Section icon="payments" title="Pricing details" subtitle={pricing.currency ? `All prices in ${pricing.currency}` : undefined}>
          <FactGrid facts={pricingFacts} columns={3} />
        </Section>
      ) : null}

      {/* Cancellation policy */}
      {hasText(cancellationPolicy.terms) ||
      hasText(cancellationPolicy.refund) ||
      hasText(cancellationPolicy.rescheduling) ||
      hasText(cancellationPolicy.noShow) ? (
        <Section icon="policy" title="Cancellation policy">
          <div className="space-y-md">
            {hasText(cancellationPolicy.terms) ? (
              <div>
                <h3 className="mb-xs font-title-md text-title-md text-on-surface">Terms</h3>
                <RichText html={cancellationPolicy.terms} />
              </div>
            ) : null}
            {hasText(cancellationPolicy.refund) ? (
              <div>
                <h3 className="mb-xs font-title-md text-title-md text-on-surface">Refunds</h3>
                <RichText html={cancellationPolicy.refund} />
              </div>
            ) : null}
            {hasText(cancellationPolicy.rescheduling) ? (
              <div>
                <h3 className="mb-xs font-title-md text-title-md text-on-surface">Rescheduling</h3>
                <RichText html={cancellationPolicy.rescheduling} />
              </div>
            ) : null}
            {hasText(cancellationPolicy.noShow) ? (
              <div>
                <h3 className="mb-xs font-title-md text-title-md text-on-surface">No-show</h3>
                <RichText html={cancellationPolicy.noShow} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* Booking information */}
      {isYes(bookingInfo.instantBooking) ||
      isYes(bookingInfo.manualApproval) ||
      hasText(bookingInfo.confirmationProcess) ||
      hasText(experience.bookingNotes) ? (
        <Section icon="confirmation_number" title="Booking information">
          <div className="mb-sm flex flex-wrap gap-xs">
            {isYes(bookingInfo.instantBooking) ? (
              <span className="inline-flex items-center gap-xs rounded-full  text-amber-500 px-sm py-xs font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">bolt</span> Instant booking
              </span>
            ) : null}
            {isYes(bookingInfo.manualApproval) ? (
              <span className="inline-flex items-center gap-xs rounded-full bg-secondary-container/50 px-sm py-xs font-label-sm text-label-sm text-on-secondary-container">
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span> Manual approval required
              </span>
            ) : null}
          </div>
          {hasText(bookingInfo.confirmationProcess) ? <RichText className="mb-sm" html={bookingInfo.confirmationProcess} /> : null}
          {hasText(experience.bookingNotes) ? <RichText html={experience.bookingNotes} /> : null}
        </Section>
      ) : null}

      {/* FAQs */}
      {experience.faqs?.length ? (
        <Section icon="quiz" title="Frequently asked questions">
          <div className="space-y-sm">
            {experience.faqs.map((faq, index) => (
              <details
                key={`${faq.question}-${index}`}
                className="group rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-md py-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-sm font-label-md text-label-md font-semibold text-on-surface [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="material-symbols-outlined shrink-0 text-[20px] text-on-surface-variant transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-sm font-body-md text-body-md leading-relaxed text-on-surface-variant">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Tags */}
      {experience.categoryTags?.length || experience.interests?.length || experience.seasonalTags?.length ? (
        <Section icon="sell" title="Tags & interests">
          <div className="space-y-sm">
            {experience.categoryTags?.length ? <PillRow items={experience.categoryTags} tone="primary" /> : null}
            {experience.interests?.length ? <PillRow items={experience.interests} tone="secondary" /> : null}
            {experience.seasonalTags?.length ? <PillRow items={experience.seasonalTags} /> : null}
          </div>
        </Section>
      ) : null}

      {/* Contact */}
      {hasFacts(contactFacts) || socialLinks.length ? (
        <Section icon="contact_mail" title="Contact the operator">
          <FactGrid facts={contactFacts} columns={2} />
          {socialLinks.length ? (
            <div className="mt-sm flex flex-wrap gap-xs">
              {socialLinks.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-xs rounded-full border border-outline-variant/50 bg-surface px-sm py-xs font-label-sm text-label-sm text-primary transition-colors hover:bg-primary-container/10"
                >
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* Legal & verification */}
      {hasFacts(legalFacts) || hasText(legal.termsAndConditions) ? (
        <Section icon="gavel" title="Legal & verification">
          <FactGrid facts={legalFacts} columns={2} />
          {hasText(legal.termsAndConditions) ? (
            <details className="mt-sm rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-md py-sm">
              <summary className="cursor-pointer list-none font-label-md text-label-md font-semibold text-on-surface [&::-webkit-details-marker]:hidden">
                Terms & conditions
              </summary>
              <RichText className="mt-sm" html={legal.termsAndConditions} />
            </details>
          ) : null}
        </Section>
      ) : null}

      {/* Reviews */}
      <Reviews reviews={reviews} average={average} reviewsCount={reviewsCount} experienceId={experience.id} />
    </div>
  );
}
