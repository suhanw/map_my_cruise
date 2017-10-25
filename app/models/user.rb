# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  fname              :string           not null
#  lname              :string           not null
#  email              :string           not null
#  country            :string
#  dob                :date
#  gender             :string
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class User < ApplicationRecord
  validates :email, :password_digest, :session_token, presence: true
  validate :validate_name, :validate_email
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password

  after_initialize :ensure_session_token

  # for avatar uploads
  has_attached_file :image, default_url: "profile-icon.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private
  def validate_name
    if fname == ""
      errors.add(:base, "First name can't be blank")
    end

    if lname == ""
      errors.add(:base, "Last name can't be blank")
    end
  end

  def validate_email
    unless email =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      errors.add(:base, "Please enter a valid email")
    end
  end


end
