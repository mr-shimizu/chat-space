require 'rails_helper'

RSpec.describe Message, type: :model do

  describe '#create' do
    context 'When able to save the message' do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end
      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end
      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'When disable to save the message' do

      it 'is invalid without content nor image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content_or_image]).to include("を入力してください")
      end
      it 'is invalid withou group_id' do
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it 'is invalid without user_id' do
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

    end

  end
end








