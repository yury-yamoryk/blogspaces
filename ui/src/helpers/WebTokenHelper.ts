
const WebTokenHelper = {
    buildHttpHeader() {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return {};
        const user = JSON.parse(storedUser);
      
        if (user && user.token) {
          return { Authorization: 'Bearer ' + user.token };
        } else {
          return {};
        }
    }
}

export default WebTokenHelper
