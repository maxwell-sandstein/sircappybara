class Photo < ActiveRecord::Base
  before_save :default_values
  validates :album_id, :img_url, :profile, :date, presence: true
  validates :profile,

  def default_values
    self.profile ||= false
  end

  belongs_to(
    :album
  )

  has_many(
    :comments,
    class_name: :photo_comment,
    foreign_key: :photo_id,
  )

  has_many(
    :likes,
    class_name: :photo_like,
    foreign_key: :photo_id
  )

  has_many(
    :taggings
  )
end
