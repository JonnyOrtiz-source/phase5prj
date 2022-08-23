class Wishlist < ApplicationRecord
  belongs_to :user
  has_many :favorites
  has_many :services, through: :favorites
end
