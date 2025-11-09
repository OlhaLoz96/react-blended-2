export interface Photo {
  id: number;
  alt: string;
  src: {
    large: string;
    original: string;
  };
  avg_color: string;
}
