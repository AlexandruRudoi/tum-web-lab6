import { createId } from '../../utils/id';
import { nowIso } from '../../utils/date';

export const seedNews = () => [
  {
    id: createId(),
    title: 'Spring Promotion: 20% off all hair services',
    category: 'Promotion',
    content:
      'Refresh your look this spring! Enjoy 20% off all haircuts and coloring services until the end of April.',
    image: '',
    pinned: true,
    liked: false,
    createdAt: nowIso(),
  },
  {
    id: createId(),
    title: 'New stylist joining our team',
    category: 'Announcement',
    content:
      'We are excited to welcome Maria, our new senior hair stylist with 10+ years of experience.',
    image: '',
    pinned: false,
    liked: false,
    createdAt: nowIso(),
  },
  {
    id: createId(),
    title: 'New skincare products available',
    category: 'Announcement',
    content: 'Discover our new line of hyaluronic and vitamin-C skincare — now in stock.',
    image: '',
    pinned: false,
    liked: false,
    createdAt: nowIso(),
  },
  {
    id: createId(),
    title: 'Holiday working schedule',
    category: 'Schedule',
    content:
      'On May 1 and May 9 the salon will be closed. Bookings will resume normally the next day.',
    image: '',
    pinned: false,
    liked: false,
    createdAt: nowIso(),
  },
];
