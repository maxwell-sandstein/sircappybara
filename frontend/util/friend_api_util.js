module.exports = {
  fetchFriends(userId, success){
    $.ajax({
			url:  `/api/users/${userId}/friends`,
			method: 'GET',
			success,
			error: function (xhr) {
			  console.log("Error in FriendApiUser #FetchFriends");
			},
		});
  },
  requestFriend(data, success){
    $.ajax({
      url:  `/api/friends`,
      method: 'POST',
      success,
      data: data,
      error: function (xhr) {
        console.log("Error in FriendsApiUtil #requestFriend");
      },
    });
  }
}
