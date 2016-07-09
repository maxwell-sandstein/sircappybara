json.array! @posts do |post|
  json.authorName post.author.username
  json.receiverName post.wall.username
  json.authorId post.author.id
  json.body post.body
  json.id post.id
  json.profilePic post.author.profile_pic.img_url
end
