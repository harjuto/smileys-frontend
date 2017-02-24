class Profile {

  constructor(profileInfo) {
    this.details = {
      ...profileInfo
    }
  }

  getGroups() {
    if (this.details.authorization) {
      return this.details.authorization.groups.slice(0,1);
    }
    return [];
  }

}

export default Profile;