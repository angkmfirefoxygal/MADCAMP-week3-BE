const User = require('../models/User'); // User 모델 예제

async function findOrCreateUser(userInfo) {
    const kakaoId = userInfo.id;
    const email = userInfo.kakao_account.email;
    const username = userInfo.properties.username;
    const profileImage = userInfo.profileImage;

  
    let user = await User.findOne({ kakaoId });
  
    if (!user) {
      user = new User({
        kakaoId,
        email,
        username,
        profileImage
      });
      await user.save();
      console.log('New user created:', user);
    } else {
      console.log('Existing user found:', user);
    }
  
    return user;
  }
  
  module.exports = {
    findOrCreateUser,
  };