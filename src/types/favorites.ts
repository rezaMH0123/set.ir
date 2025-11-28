// types.ts or top of your component file
export interface FavoriteItem {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;

}

export interface PaginationResponse<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
}
