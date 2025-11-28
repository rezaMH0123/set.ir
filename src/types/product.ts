export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  finalPrice: string;
  price: number;
  discountAmount: number;
  discountPercentage: string;
  discountId: string | null;
  display: string;
  status: string;
  type: string;
  thumbnailUrl: string;
  categories: { id: number; name: string }[];
  tags: [];
  grades: { id: number; name: string }[];
  teachers: [];
  majors: { id: number; name: string }[];
  lessons: { id: number; name: string }[];
  contents: ContentSection[];
  features: Feature[];
  totalComments: number;
  averageRating: number;
}

interface Feature {
  iconName: string;
  name: string;
}

export interface ContentSection {
  name: string;
  sortOrder: number;
  files: FileItem[];
  videos: VideoItem[];
  webinars: WebinarItem[];
}

export interface FileItem {
  id: string;
  fileName: string;
  filePath: string | null;
  filePages: number;
  isPreview: boolean;
  sortOrder: number;
  type: "Textbook" | "SummaryNotes" | "SolvedQuestions" | string;
}

export interface VideoItem {
  videoName: string;
  videoLink: string | null;
  videoTime: string;
  isPreview: boolean;
  player: "Aparat" | "Arvan" | "Samin";
  sortOrder: number;
}

export interface WebinarItem {
  webinarName: string;
  webinarLink: string;
  webinarTime: string;
  date: string;
  isPreview: boolean;
  player: "Aparat" | "Arvan" | "Samin";
  sortOrder: number;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string | null;
  rate: number;
  createdAt: string;
  replies: Comment[];
}
