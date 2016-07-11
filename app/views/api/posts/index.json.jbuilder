json.array! @posts do |post|
  json.authorName post.author.username
  json.authorImgUrl post.author.profile_pic.img_url
  json.receiverName post.wall.username
  json.receiverId post.wall_id
  json.authorId post.author.id
  json.body post.body
  json.id post.id
end
