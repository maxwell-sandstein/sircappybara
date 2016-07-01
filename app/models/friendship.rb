class Friendship < ActiveRecord::Base
  validates :requestor_id, :requestee_id, :accepted, presence: true
  validates :requestor_id, uniqueness: {scope: :requestee_id}
  validates :accepted, inclusion: {in [true, false]}

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
