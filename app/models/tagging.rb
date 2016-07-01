class Tagging < ActiveRecord::Base
  validates :photo_id, :user_id, presence: true
  validates :photo_id, uniqueness: {scope: :user_id}

  belongs_to(
    :photo
  )

  belongs_to(
    :user
  )
end
