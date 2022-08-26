class User < ApplicationRecord
    has_secure_password

    has_one :account
    has_one :wishlist
    has_many :favorites, through: :wishlist

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
end
