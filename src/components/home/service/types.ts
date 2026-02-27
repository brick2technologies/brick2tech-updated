export type Service = {
  title: string;
  image: string;
  description: string;
  subServices: string[];
};

export const services: Service[] = [
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    description: "Accelerating your online growth through data-driven strategies and creative campaigns.",
    subServices: ["Social Media", "Pay Per Click", "SEO", "Ads Campaigns"],
  },
  {
    title: "Graphic Design",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070",
    description: "Crafting visual identities that tell your brand's unique story through modern aesthetics.",
    subServices: ["Brochure Design", "Logo Design", "Poster Design", "Branding"],
  },
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    description: "Building high-performance, scalable web applications with cutting-edge technologies.",
    subServices: ["Web Apps", "Landing Pages", "E-commerce", "Website Design"],
  },
];