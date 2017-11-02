export const searchUsers = (searchTerm) => {
  return $.ajax({
    url: `api/users?search_term=${searchTerm}`,
    method: 'get',
  });
};
