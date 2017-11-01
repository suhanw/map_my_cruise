# == Schema Information
#
# Table name: friend_statuses
#
#  id            :integer          not null, primary key
#  friender_id   :integer          not null
#  friendee_id   :integer          not null
#  friend_status :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class FriendStatus < ApplicationRecord
  validates :friender, :friendee, :friend_status, presence: true
  validates :friendee, uniqueness: { scope: :friender }
  validates :friend_status, inclusion: { in: ['pending', 'yes'] }

  belongs_to :friender,
    foreign_key: :friender_id,
    class_name: 'User'

  belongs_to :friendee,
    foreign_key: :friendee_id,
    class_name: 'User'

end
