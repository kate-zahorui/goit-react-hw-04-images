const API_KEY = '28719024-dfd1ea369e11fcf1315c36358';
const baseUrl = 'https://pixabay.com/api/';

export const UserAPI = {
  fetchImages: async (searchQuery, page) => {
    let requestName = searchQuery.split(' ').join('+');
    const url = `${baseUrl}?q=${requestName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const response = await fetch(`${url}`);
    // const images = await imagesResponse.json();

    return response;
  },
};
