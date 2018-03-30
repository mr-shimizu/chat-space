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
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end

end

