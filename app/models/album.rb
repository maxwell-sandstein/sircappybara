class Album < ActiveRecord::Base
  validates :user_id, :title, :date, presence: true
  validates :user_id, uniqueness: {scope: :title}

  belongs_to(
    :user
  )

  has_many(
    :photos,
  )
end
