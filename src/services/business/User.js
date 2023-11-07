export default class UserService {
  static isArtist(user) {
    return user.roleId === 3
  }

  static isGallerist(user) {
    return user.roleId === 2
  }
}
