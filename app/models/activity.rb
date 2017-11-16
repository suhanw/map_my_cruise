class Activity < ApplicationRecord
  belongs_to :feedable, polymorphic: true
end
