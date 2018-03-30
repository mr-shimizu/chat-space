class MessagesController < ApplicationController


  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
  end

  def create
    @message = Message.create(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:name, :image, :group_id, :user_id, :image_cache)
  end

end

