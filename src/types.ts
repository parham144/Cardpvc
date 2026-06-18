export interface CardType {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  basePricePerCard: number; // in Tomans
  suggestedThicknesses: string[];
  features: string[];
  recommendedMinQty: number;
}

export interface OrderItem {
  id: string;
  cardTypeId: string;
  cardTitle: string;
  thickness: string; // "300" | "500" | "760" | "800"
  printingMethod: string; // "single_color" | "color_single" | "color_double" | "metallic"
  finishType: string; // "glossy" | "matte" | "sand" | "frosted"
  quantity: number;
  rfidChipType?: string; // "none" | "mifare_1k" | "mifare_4k" | "em125" | "ntag"
  hasMagneticStripe: boolean;
  hasSignaturePanel: boolean;
  hasScratchOff: boolean;
  hasVariableData: boolean;
  designFile?: {
    name: string;
    size: string;
    previewUrl?: string;
  };
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    companyName?: string;
    address: string;
    postalCode?: string;
  };
  totalPrice: number;
  orderDate: string;
  status: 'pending_review' | 'awaiting_payment' | 'printing' | 'shipped' | 'delivered';
  trackingCode: string;
}

export interface PortfolioSample {
  id: string;
  title: string;
  category: string; // "membership" | "personnel" | "gift" | "smart" | "luxury"
  description: string;
  thickness: string;
  finish: string;
  frontImage: string;
  backImage: string;
  specialOptions?: string[];
  accentColor: string; // tailwind color class e.g., 'indigo'
  textColor: string;
  cardNumber: string;
  holderName: string;
}
