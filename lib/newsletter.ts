export type NewsletterPost = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  meta: string;
  gradient: string;
};

const gradients = [
  "from-[#2e4be0] via-[#1b2f9e] to-[#0d1533]",
  "from-[#4a6bff] via-[#2e4be0] to-[#101a4d]",
  "from-[#1e2f8f] via-[#14204f] to-[#0a101f]",
  "from-[#3a57ea] via-[#243bc0] to-[#0b112f]",
  "from-[#2e4be0] via-[#16246e] to-[#080d1f]",
];

export const posts: NewsletterPost[] = Array.from({ length: 5 }).map((_, i) => ({
  category: "lifestyle",
  title: "The latest new with Flowspark",
  excerpt:
    "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
  author: "Laila Bahar",
  meta: "Sept 28, 2020 - 6 mins read",
  gradient: gradients[i % gradients.length],
}));
