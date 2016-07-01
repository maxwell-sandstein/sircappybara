class Post < ActiveRecord::Base
  validates :author_id, :wall_id, :body, :date, presence: true

  has_many(
    :shares
  )

  belongs_to(
    :author,
    class_name: :user,
    foreign_key: :author_id
  )

  belongs_to(
    :wall,
    class_name: :user,
    foreign_key: :wall_id
  )

  has_many(
    :comments,
    class_name: :post_comments,
    foreign_key: :post_id
  )

  has_many(
    :likes,
    class_name: :post_like,
    foreign_key: :post_id
  )
end
