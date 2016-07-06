# == Schema Information
#
# Table name: friendships
#
#  id           :integer          not null, primary key
#  requestor_id :integer          not null
#  requestee_id :integer          not null
#  accepted     :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Friendship < ActiveRecord::Base
  validates :requestor_id, :requestee_id, :accepted, presence: true
  validates :requestor_id, uniqueness: {scope: :requestee_id}
  validates :accepted, inclusion: {in: [true, false]}

  belongs_to(
    :requestor,
    class_name: :user,
    foreign_key: :requestor_id
  )

  belongs_to(
    :requestee,
    class_name: :user,
    foreign_key: :requestee_id
  )
end
