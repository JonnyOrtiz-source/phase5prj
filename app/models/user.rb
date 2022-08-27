class User < ApplicationRecord
    has_secure_password

    has_one :account, dependent: :destroy
    has_one :wishlist, dependent: :destroy
    has_many :favorites, through: :wishlist, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
end
