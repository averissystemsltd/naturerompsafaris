/**
 * Guest reviews shown on the public site. Homepage testimonials are Google only.
 * Names, dates and quote text come from Nature Romp's live Google Business Profile.
 */

export type HomeReview = {
  id: string;
  guestName: string;
  location?: string;
  source: 'Google' | 'Tripadvisor';
  quote: string;
  rating: number;
};

export type HomeReviewSource = 'google' | 'tripadvisor';

/** Shape served to the homepage reviews slider (DB-backed, with static fallback). */
export type HomeReviewItem = {
  id: string;
  authorName: string;
  authorLocation: string | null;
  rating: number;
  source: HomeReviewSource;
  body: string;
  reviewDate: string | null;
  avatarUrl: string | null;
};

export const HOME_REVIEWS_SUMMARY = {
  count: '120+',
  label: 'Reviews on Google + Tripadvisor'
} as const;

export const HOME_REVIEWS: HomeReview[] = [
  {
    id: 'review-lucy-s',
    guestName: 'Lucy S',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'Nature Romp made our Kenya trip seamless and incredible. Being able to plan our itinerary directly with Ben was a huge help, and our guide Stan and the drivers were exceptional. We formed real bonds throughout the journey.'
  },
  {
    id: 'review-andrea-d',
    guestName: 'Andrea D',
    location: 'Milwaukee, Wisconsin',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'Travelling all the way from the US to Kenya felt daunting, but Nature Romp made the complicated arrangements simple. The team was friendly, responsive and helpful, and our drivers were punctual and knowledgeable at every location.'
  },
  {
    id: 'review-ryan-m',
    guestName: 'Ryan M',
    location: 'Crystal Lake, Illinois',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'The best safari guides in Kenya! Ben and Duncan arranged everything and gave us excellent guidance, knowledge and service across two unforgettable days of game drives packed with wildlife.'
  },
  {
    id: 'review-vicky-d',
    guestName: 'Vicky D',
    location: 'Weyhill, United Kingdom',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'Brilliant service from start to finish on our 10-day safari. The staff were always on time and went out of their way to make us feel comfortable and safe in an unfamiliar country.'
  },
  {
    id: 'review-stan-m',
    guestName: 'Stan M',
    location: 'California, Maryland',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'A 10/10 Moshi to Arusha trip. From the airport pickup to the hotels and activities, every part of our three-day trip was handled incredibly well. Highly recommended.'
  },
  {
    id: 'review-marianne-d',
    guestName: 'Marianne D',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'The organisation was fantastic and the support responsive throughout. Nature Romp put together an excellent combination of safari and resort that made the whole holiday effortless. Highly recommend.'
  },
  {
    id: 'review-benbenja',
    guestName: 'Benjamin N',
    location: 'Kenya',
    source: 'Google',
    rating: 5,
    quote:
      'Excellent planning of the trip, from a helpful sales team to the airport pick-up and a great choice of hotels. Together with my family we had a wonderful time. It was all magic, thanks to our tour guide who made everything amazing.'
  },
  {
    id: 'review-muteroh-e',
    guestName: 'Muteroh E',
    source: 'Tripadvisor',
    rating: 5,
    quote:
      'A thrilling Kenyan safari adventure. The staff were first class, the guides genuinely knowledgeable and the vehicles in great condition. I can already say I will be booking another trip with Nature Romp.'
  }
];

/** Real Google Business Profile reviews used when the CMS has none published yet. */
export const FALLBACK_GOOGLE_HOME_REVIEWS: HomeReviewItem[] = [
  {
    id: 'google-hasan-cicek',
    authorName: 'Hasan Cicek',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2025-04-05',
    avatarUrl: null,
    body: 'I just completed my 4-day trip to Mount Kenya and I am very satisfied with all the services provided. I received excellent assistance throughout the entire process, from start to finish. I would strongly recommend choosing them if you are planning a trip to Kenya. I would definitely choose them again if I return.'
  },
  {
    id: 'google-ajith-vasudevan',
    authorName: 'Ajith Vasudevan',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2025-03-03',
    avatarUrl: null,
    body: 'After screening and talking to about 5 travel operators, I decided to go with Nature Romp for an 8 day safari in Kenya, in Feb 2025. Their rate was competitive and selection of lodges to stay very good. Initially I was skeptical due to less reviews about Nature Romp in public domain. However when I talked to Yvonne, I understood that theirs is a fairly new company and I decided to go with them. We (my daughter and I) opted for a private tour covering Masai Mara, Nakuru and Amboseli. We were received at the Nairobi airport and the next day early morning Yvonne, Lucy and Maxwell (guide cum driver) welcomed us at the hotel, prior to starting the safari. We instantly felt at home and from then onwards it was a positive experience all the time. Our guide Maxwell is an excellent guide. He knew about birds and animals, their behavior and diligent in driving (safe driving). He was always on time. If i had to do anything differently, its only about selecting the stay option at one place (Naivasha). Although the accommodation was very good, it was pretty far from the National park. Drawing the route map and time to take to this palace would have helped me giving an additional 4 hours for bird photography. Thank you Yvonne and Maxwell. I surely plan to do another safari with Nature Romp in 2026'
  },
  {
    id: 'google-charles-otieno',
    authorName: 'Charles Otieno',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-11-26',
    avatarUrl: null,
    body: 'initially asked for 3 quotations for my 7-days safari in Kenya (Masai Mara-Amboseli-Nakuru-Naivasha). All 3 tours companies replied me right away but Ms Yvonne Ateka from Nature Romp Safaris was by far the most outstanding and patient in answering dozens of my questions concerning visa, safety, accommodation, preparation, etc. She was also extremely flexible in helping me changing my safari schedule due to my unexpected 2-days delay at transit airport New Delhi. The entire tour was fascinating!!! It was the very best trip I have ever had (I have travelled 30+ countries so far)! Kenyan nature and wildlife is breathtakingly beautiful even more than I have imagined before. Freddy was very caring, knowledgeable and a super offroad driver. Thank you so much again Yvonne & Freddy for making my trip in Kenya a great experience! I would wholeheartedly recommend you guys for all my friends travelling to you amazing country!'
  },
  {
    id: 'google-paola',
    authorName: 'Paola',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-03-09',
    avatarUrl: null,
    body: 'Great experience, I recommend it'
  },
  {
    id: 'google-gayatri-rawat',
    authorName: 'Gayatri Rawat',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-03-09',
    avatarUrl: null,
    body: 'They were so kind and helpful. Really appreciate the care and support.'
  },
  {
    id: 'google-malcolm-gatonye',
    authorName: 'malcolm Gatonye',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-01-15',
    avatarUrl: null,
    body: 'Awesome experience'
  },
  {
    id: 'google-wilfred',
    authorName: 'Wilfred',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-01-14',
    avatarUrl: null,
    body: 'Great venture and travel from Romp thank you so much Yvonne.'
  },
  {
    id: 'google-jupiter-ly',
    authorName: 'Jupiter Ly',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-01-10',
    avatarUrl: null,
    body: 'I enjoyed the Mara safaris with you last holiday. Looking forward to book with you once more, in my next vacation in December.'
  },
  {
    id: 'google-otieno-eric',
    authorName: 'Otieno Eric',
    authorLocation: null,
    rating: 5,
    source: 'google',
    reviewDate: '2024-01-10',
    avatarUrl: null,
    body: 'The agency is great, we couldnt ask for better! Yvonne is a very nice agent and helped with everything right away. We were pretty lucky with out tour guides Gibson (Kenya tour) and Godfrey (Tanzania tour) who were beyond AWESOME! We do miss them both very much already.'
  }
];

/** Static fallback used when the database has no published Google reviews yet. */
export const FALLBACK_HOME_REVIEWS: HomeReviewItem[] = FALLBACK_GOOGLE_HOME_REVIEWS;
