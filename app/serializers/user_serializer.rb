class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :is_Admin, :email, :password_digest
end
