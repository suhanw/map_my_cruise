# == Schema Information
#
# Table name: activities
#
#  id            :integer          not null, primary key
#  feedable_type :string
#  feedable_id   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

class Activity < ApplicationRecord
  belongs_to :feedable, polymorphic: true
  belongs_to :user
end
