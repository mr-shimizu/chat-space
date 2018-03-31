class MessagesController < ApplicationController
before_action :set_group

  def index
    @message = Message.new
  end

  def create
    @message = Message.create(message_params)
    if @message.save(message_params)
      redirect_to group_messages_path
    else
      redirect_to group_messages_path, alert: "空のメッセージは保存されません"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end

