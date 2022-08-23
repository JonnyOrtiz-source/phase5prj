class FavoriteSerializer < ActiveModel::Serializer
  attributes :id
  has_one :wishlist
  has_one :service
end
