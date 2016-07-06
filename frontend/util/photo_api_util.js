
  module.exports = {
    createProfilePic(userId, albumId, json, success){
      $.ajax({
  			url: `/api/users/${userId}/albums/${albumId}/photos`,
  			type: 'POST',
  			data: json,
  			success,
        error: function (xhr) {
          console.log("Error in Photo Util #createProfilePic");
        }
  		});
    },

    createCoverPhoto(userId, albumId, json, success){
      $.ajax({
        url: `/api/users/${userId}/albums/${albumId}/photos`,
        type: 'POST',
        data: json,
        success,
        error: function (xhr) {
          console.log("Error in Photo Util #createCoverPic");
        }
      });
    }
  }
