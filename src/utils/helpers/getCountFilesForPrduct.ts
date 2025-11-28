import { Product } from "@/types/product";

export function getTotalDuration(product: Product): string | number {
  let totalSeconds = 0;

  for (const content of product.contents) {
    for (const video of content.videos) {
      const [hours, minutes, seconds] = video.videoTime.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    }
  }

  if (totalSeconds === 0) {
    return 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} دقیقه`;
  }

  return `${hours} ساعت و ${minutes} دقیقه`;
}

export function getFilesCount(product: Product): number {
  let files = 0;

  for (const content of product.contents) {
    files += content.files.length;
  }

  return files;
}

export function getExamCount(product: Product): number {
  let exams = 0;

  for (const content of product.contents) {
    exams += content.files.filter(
      (file) => file.type === "SolvedQuestions"
    ).length;
  }

  return exams;
}
export function getSummaryNotesCount(product: Product): number {
  let notes = 0;

  for (const content of product.contents) {
    notes += content.files.filter(
      (file) => file.type === "SummaryNotes"
    ).length;
  }

  return notes;
}

export function getTotalPages(product: Product): number {
  let totalPages = 0;

  for (const content of product.contents) {
    for (const file of content.files) {
      totalPages += file.filePages;
    }
  }

  return totalPages;
}
