const current_time = new Date().getTime() / 1000;

const jwt_decode = (token = '') => {
  if (token !== '') {
    return {
      exp: current_time + 1000,
      name: 'user1',
    };
  }
  return {
    exp: current_time - 1000,
    name: 'user1',
  };
};

export default jwt_decode;
