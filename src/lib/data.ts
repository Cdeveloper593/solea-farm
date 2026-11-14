export type Product = {
  slug: string
  name: string
  family: 'Marmalades' | 'Pestos & Savoury' | 'Oils & Honey'
  notes: string
  price: number
  size: string
  image: string
  alt: string
  hue: string
  badge?: string
}

export const PRODUCTS: Product[] = [
  { slug: 'tarocco-marmalade', name: 'Tarocco Blood Orange Marmalade', family: 'Marmalades', notes: 'Bitter peel, wild fennel pollen, a whisper of Etna honey.', price: 12, size: '240 g jar', image: '/images/orange.jpg', alt: 'Fresh Tarocco oranges on the branch with green leaves', hue: '#E85D1F', badge: 'Signature' },
  { slug: 'femminello-lemon', name: 'Femminello Lemon & Sage Preserve', family: 'Marmalades', notes: 'Thick-cut zest, garden sage, cane sugar — nothing else.', price: 11, size: '240 g jar', image: '/images/lemons.jpg', alt: 'A pile of ripe yellow Femminello lemons', hue: '#F0A202' },
  { slug: 'mandarin-ginger', name: 'Late Mandarin & Ginger Jam', family: 'Marmalades', notes: 'Ciaculli mandarins picked in March, fresh ginger root.', price: 12, size: '220 g jar', image: '/images/mandarin.jpg', alt: 'A single mandarin with leaf against a blue background', hue: '#E8841B', badge: 'Small batch' },
  { slug: 'berry-grove', name: 'Wild Berry & Citrus Leaf Jam', family: 'Marmalades', notes: 'Hedgerow berries folded through lemon-leaf syrup.', price: 13, size: '220 g jar', image: '/images/berries.jpg', alt: 'Fresh raspberries, blueberries and blackberries', hue: '#7A2E35' },
  { slug: 'pesto-agrumi', name: 'Citrus-Leaf Pesto', family: 'Pestos & Savoury', notes: 'Basil, orange leaf, toasted almonds, aged pecorino.', price: 14, size: '180 g jar', image: '/images/basil.jpg', alt: 'A young basil plant in a white pot', hue: '#47663B', badge: 'New harvest' },
  { slug: 'sun-tomato', name: 'Sun-Tomato & Chilli Spread', family: 'Pestos & Savoury', notes: 'Slow-dried tomatoes, Calabrian chilli, our own oil.', price: 13, size: '190 g jar', image: '/images/tomato.jpg', alt: 'A ripe tomato resting on a stone surface', hue: '#C33A21' },
  { slug: 'olio-solea', name: 'Olio Solea — Citrus Grove Oil', family: 'Oils & Honey', notes: 'Nocellara olives co-pressed with whole bitter oranges.', price: 19, size: '500 ml bottle', image: '/images/oil.jpg', alt: 'A glass bottle of golden olive oil beside fresh olives', hue: '#8A7A1E', badge: 'First press' },
  { slug: 'zagara-honey', name: 'Zagara Blossom Honey', family: 'Oils & Honey', notes: 'Raw honey from hives that live inside the lemon grove.', price: 15, size: '250 g jar', image: '/images/honey-jar.jpg', alt: 'Honey drizzling from a dipper into a glass jar', hue: '#D9930D' },
]

export const TESTIMONIALS = [
  { quote: 'The Tarocco marmalade tastes like the grove smells in February — peel, blossom and cold morning air, all in one spoonful.', name: 'Elena Marchetti', title: 'Chef, Osteria Lume — Milan' },
  { quote: 'We have served Solea pesto for two seasons. Guests ask for the jar by name, which has never happened with a preserve before.', name: 'Tomás Ribeiro', title: 'Restaurateur — Lisbon' },
  { quote: 'You can tell the fruit was picked days, not weeks, before the copper pan. The lemon preserve is the brightest thing in our shop.', name: 'Hana Yoshida', title: 'Buyer, Ferma Delicatessen — Kyoto' },
  { quote: 'Their grove oil finished a simple tomato salad and made it taste engineered. It is now the only oil on our pass.', name: 'Marcus Webb', title: 'Head Chef, Brine & Co. — London' },
  { quote: 'Visiting at blossom time is worth the flight alone. We left with honey, oil, and a standing order for the restaurant.', name: 'Claire Dubois', title: 'Food writer — Paris' },
]

export const JOURNAL = [
  { title: 'Bruschetta, three ways from one jar', meta: 'Recipes · 6 min', image: '/images/harvest.jpg', alt: 'Hands holding a bowl of freshly picked cherry tomatoes', text: 'Citrus-leaf pesto, whipped ricotta and a mandarin jam glaze — the farm kitchen’s favourite fifteen-minute lunch.' },
  { title: 'Why we pick Tarocco at dawn', meta: 'From the grove · 4 min', image: '/images/oranges-pile.jpg', alt: 'A harvest crate overflowing with oranges', text: 'Cold fruit keeps its perfume. Our pickers start before the sun crosses the wall, and the pans are lit by nine.' },
  { title: 'A smoothie that eats like breakfast', meta: 'Recipes · 3 min', image: '/images/smoothie.jpg', alt: 'Berry smoothies topped with fresh fruit', text: 'Wild berry jam loosened with yogurt and ice — the jar’s second life, straight from the blender.' },
]
