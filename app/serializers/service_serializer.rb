class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image_url
  has_one :service_type
  has_one :duration
end
