class User < ActiveRecord::Base
  validates :username, :password, :email, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :session_token, :email, uniqueness: true
  validates :gender, inclusion: {in: ["male", "female"]}, allow_nil: true

  has_many(
    :friend_requests_made,
    class_name: :friendship,
    foreign_key: :requestor_id
  )
  has_many(
    :friend_requests_accepted,
    class_name: :friendship,
    foreign_key: :requestee_id
  )

  has_one(
    :relationship_made,
    class_name: :relationship,
    foreign_key: :requestor_id
  )
  has_one(
    :relationship_accepted,
    class_name: :relationship,
    foreign_key: :requestee_id
  )

  def partner

  end

  has_many(
    :messages_recieved,
    class_name: :messages,
    foreign_key: :receiver_id
  )
  has_many(
    :messages_sent,
    class_name: :messages,
    foreign_key: :sender_id
  )



  has_many(
    :taggings
  )

  has_many(
    :albums
  )

  has_many(
    :photo_likes
  )

  has_many(
    :post_likes
  )

  has_many(
    :posts_authored,
    class_name: :post,
    foreign_key: :author_id
  )

  has_many(
    :wall_posts,
    class_name: :post,
    foreign_key: :wall_id
  )

  has_many(
    :shares
  )
end
