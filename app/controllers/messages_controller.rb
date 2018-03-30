class MessagesController < ApplicationController

  mount_uploader :image, ImageUploader

  def index
    @messages = Message.all
  end

  def create
    @message = Message.create(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:name, :image, :group_id, :user_id)
  end

end

