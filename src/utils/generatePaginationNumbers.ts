
// [1,2,3,'...',10]
export const generatePaginationNumbers = (currentPage: number, totalPage: number) => {
    // let pages: (number | string)[] = [];

    if (totalPage <= 7) {
        return Array.from({ length: totalPage }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPage - 1, totalPage]; // [1,2,3,'...',10,11]
    }

    if (currentPage >= totalPage - 2) {
        return [1, 2, '...', totalPage - 2, totalPage - 1, totalPage]; // [1,2,'...',10,11,12]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage]; // [1,'...',4,5,6,'...',10]
}
