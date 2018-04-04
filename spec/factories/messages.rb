FactoryGirl.define do

  factory :message do
    content      {Faker::Lorem.sentence}
    image        {File.open("#{Rails.root}/public/uploads/message/image/22/b594a94267a4cde9bb9e13a9d2e0df2a.jpg")}
    user
    group
  end
end
