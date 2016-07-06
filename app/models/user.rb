# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  gender          :string
#  breed           :string
#  birthday        :date
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :session_token, :email, uniqueness: true
  validates :gender, inclusion: {in: ["male", "female"]}, allow_nil: true
  after_initialize :ensure_session_token
  after_create :create_albums

  attr_reader :password

  PROFILE_DEFAULT = 'http://www.hellasmultimedia.com/webimages/back-htm/backgrounds/back1/BG070.JPG'

  DEFAULT_ALBUM_TITLES = {
    profile: "Profile Pictures",
    cover: "Cover Photos"
  }

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

  has_many(:photos,
  	through: :albums,
    source: :photos
    )

  has_many :comments,
  	foreign_key: :user_id,
  	class_name: "Comment"


	def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

  def profile_pic
    arr = self.photos.where(profile: true)

    unless arr.length >= 1
      return Fake_Photo.new(PROFILE_DEFAULT)
    end

    arr[0]
  end

  def profile_album_id
    self.albums.find_by_title(DEFAULT_ALBUM_TITLES[:profile]).id
  end

  def cover_album_id
    self.albums.find_by_title(DEFAULT_ALBUM_TITLES[:cover]).id
  end

  def cover_photo
    arr = self.photos.where(cover: true)

    unless arr.length >= 1
      return Fake_Photo.new(PROFILE_DEFAULT)
    end

    arr[0]
  end

	def self.find_by_credentials email, password
		user = User.find_by(email: email)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is? password
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
    self.save!
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom::urlsafe_base64(16)
	end

  def create_albums
    Album.create({title: DEFAULT_ALBUM_TITLES[:profile], user_id: self.id});
    Album.create({title: DEFAULT_ALBUM_TITLES[:cover], user_id: self.id});
  end
end

class Fake_Photo
  #include singleton
  attr_reader :img_url

  def initialize(img_url)
    @img_url = img_url
  end
end
