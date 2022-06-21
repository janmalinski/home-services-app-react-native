interface AdItem {
  id: string;
  name: string;
}

export interface Ad {
  id: string;
  description: string;
  services: AdItem[];
}
