export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Aura Noise-Canceling Headphones",
    price: 299,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1624564039739-035817ba4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NzQyNjUyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 124,
    description: "Experience silence like never before. The Aura headphones deliver pure, undisturbed sound wrapped in a minimalist, ultra-lightweight design. Perfectly tuned for deep bass and crystal-clear highs.",
    features: ["Active Noise Cancellation", "40-hour battery life", "Bluetooth 5.3", "Premium aluminum build"],
    isNew: true
  },
  {
    id: "p2",
    name: "ZenBook Pro 14",
    price: 1499,
    category: "Computing",
    image: "https://images.unsplash.com/photo-1614630536369-2516d7c0a58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wfGVufDF8fHx8MTc3NDM1MDI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 89,
    description: "The ultimate tool for creators. ZenBook Pro 14 combines a stunning OLED display with uncompromised performance inside a chassis that is both elegant and durable.",
    features: ["14-inch OLED Display", "M3 Max Chip", "32GB Unified Memory", "1TB SSD"]
  },
  {
    id: "p3",
    name: "Mechanical K1 Keyboard",
    price: 149,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1626958390898-162d3577f293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzc0Mjg3MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 210,
    description: "Tactile perfection. The K1 brings the joy of typing to your fingertips with custom linear switches, a solid CNC-machined aluminum body, and an uncompromising minimalist aesthetic.",
    features: ["Custom Linear Switches", "Hot-swappable PCB", "CNC Aluminum Body", "PBT Keycaps"],
    isNew: true
  },
  {
    id: "p4",
    name: "Echo Minimalist Speaker",
    price: 199,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1570652279453-c17e3580126c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc3BlYWtlcnxlbnwxfHx8fDE3NzQzNTAyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 45,
    description: "Fill your room with sound, not clutter. The Echo speaker delivers 360-degree high-fidelity audio in a monolithic design that blends seamlessly into any modern interior.",
    features: ["360° Spatial Audio", "Wi-Fi & Bluetooth", "Multi-room sync", "20W Output"]
  },
  {
    id: "p5",
    name: "Precision Mouse G4",
    price: 89,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NzQzNTAyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 320,
    description: "Designed for professionals and gamers alike. The G4 offers pixel-perfect tracking and a perfectly sculpted ergonomic shape that fits flawlessly in your hand.",
    features: ["25,000 DPI Sensor", "Sub-1ms latency", "Ergonomic design", "70-hour battery"]
  },
  {
    id: "p6",
    name: "Ultrawide Monitor X1",
    price: 599,
    category: "Computing",
    image: "https://images.unsplash.com/photo-1567167680325-2203584962b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbW9uaXRvcnxlbnwxfHx8fDE3NzQzNTAyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 112,
    description: "Expand your horizon. The X1 monitor features an expansive 34-inch curved display with stunning color accuracy, creating a seamless and immersive workspace.",
    features: ["34-inch WQHD Curved", "144Hz Refresh Rate", "99% sRGB color", "USB-C with 90W PD"]
  },
  {
    id: "p7",
    name: "Aura Smart Hub",
    price: 129,
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBkZXZpY2V8ZW58MXx8fHwxNzc0MjgxNTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 67,
    description: "Control your entire digital ecosystem from one elegant interface. The Aura Smart Hub blends into your home while providing instant access to lighting, climate, and security.",
    features: ["Matter compatible", "Touch interface", "Ambient light sensor", "Voice assistant"]
  }
];
