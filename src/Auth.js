export function isAuthenticated() {
    const token = sessionStorage.getItem("token");
    return token !== undefined && token !== null;
  }

 export function logout(cb) {
    sessionStorage.removeItem("token");
    if (cb) return cb();
  }