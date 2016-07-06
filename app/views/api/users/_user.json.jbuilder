json.extract! user, :id, :username, :email, :gender, :breed, :birthday, :profile_album_id, :cover_album_id
json.profileAlbumId user.profile_album_id
json.profileCoverId user.cover_album_id
