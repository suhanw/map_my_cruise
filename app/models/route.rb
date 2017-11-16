# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  polyline   :text             not null
#  city       :string
#  distance   :float
#  elevation  :float
#  privacy    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
  validates :user, :name, :city, :distance, presence: true
  validate :validate_polyline
  validates :name, uniqueness: { scope: :user }

  belongs_to :user
  has_many :workouts, dependent: :destroy

  has_one :activity, as: :feedable, dependent: :destroy

  private

  def validate_polyline
    if polyline == ""
      errors.add(:base, "You must have at least 2 points on the map to save a route.")
    end
  end
end
