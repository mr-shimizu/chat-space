class Group < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :users,      through:   :members

  accepts_nested_attributes_for :members, allow_destroy: true

  validates :name, presence: true
end
