# == Schema Information
#
# Table name: post_comments
#
#  id         :integer          not null, primary key
#  photo_id   :integer          not null
#  user_id    :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostComment < ActiveRecord::Base
  validates :photo_id, :user_id, :body, presence: true

  belongs_to(
    :post
  )

  belongs_to(
    :user
  )
end
