class Service < ApplicationRecord
  belongs_to :service_type
  belongs_to :duration

  validates :name, presence:true
  validates :description, presence:true
  validates :price, presence:true
  validates :image_url, presence:true
end
