const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];


export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}


export function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString("en-IN");

  return toBengaliNumber(formattedPrice);
}


export function getUnitBn(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    gram: "প্রতি গ্রাম",
  };

  return units[unit] || unit;
}


export function getBanglaDate(): string {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const today = new Date();

  const day = days[today.getDay()];
  const date = toBengaliNumber(today.getDate());
  const month = months[today.getMonth()];
  const year = toBengaliNumber(today.getFullYear());

  return `${day}, ${date} ${month}, ${year}`;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };

  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}


