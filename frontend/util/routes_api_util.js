export const fetchRoutes = () => {
  return $.ajax({
    url:'api/routes/',
    method: 'get',
  });
};

export const fetchRoute = (routeId) => {
  return $.ajax({
    url:`api/routes/${routeId}`,
    method:'get'
  });
};

export const createRoute = (route) => {
  return $.ajax({
    url:`api/routes/`,
    method: 'post',
    data: {route}
  });
};

export const updateRoute = (route) => {
  return $.ajax({
    url:`api/routes/${route.id}`,
    method: 'patch',
    data: {route}
  });
};

export const deleteRoute = (routeId) => {
  return $.ajax({
    url:`api/routes/${routeId}`,
    method:'delete'
  });
};

export const fetchCity = (latLng) => {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?";
  url += `latlng=${latLng}`;
  url += "&result_type=administrative_area_level_2";
  url += "&key=AIzaSyBikueOt0xpkbFjWOncTXfVj5HEg_pu8f8";

  return $.ajax({
    url: url,
    method: 'get',
  });
};
