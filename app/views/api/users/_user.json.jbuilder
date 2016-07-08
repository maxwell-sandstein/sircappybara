json.extract! user, :id, :username, :email, :gender, :breed, :birthday, :profile_album_id, :cover_album_id
json.profileAlbumId user.profile_album_id
json.coverAlbumId user.cover_album_id
json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.username
end
