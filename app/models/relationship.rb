class Relationship < ActiveRecord::Base
  validates :requestor_id, :requestee_id, presence: true, uniqueness: true
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
