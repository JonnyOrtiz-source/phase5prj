class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image_url, :service_type_name, :time_interval
  # has_one :service_type
  # has_one :duration

  def service_type_name
    ServiceType.find(object.service_type_id).service_type_name
  end
  
  def time_interval
    Duration.find(object.duration_id).time_interval
  end

end
