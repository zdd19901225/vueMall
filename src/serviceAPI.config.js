const BASEURL = 'http://mockjs.com/api/';
const LOCALURL = 'http://localhost:3000/user/';
const URL = {
    getIndexData : BASEURL + 'posts',
    getUserData : LOCALURL + 'register',
    loginUserData : LOCALURL + 'login'
}

module.exports = URL;