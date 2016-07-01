class PhotoComment < ActiveRecord::Base
  validates :photo_id, :user_id, :comment, presence: true

  belongs_to(
    :photo
  )

  belongs_to(
    :user
  )
end
