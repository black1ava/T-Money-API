class CustomErrorLogin {
  constructor(email = "", password = "") {
    this.email = email;
    this.password = password;
  }
}

CustomErrorLogin.prototype = new Error();

module.exports = CustomErrorLogin;
