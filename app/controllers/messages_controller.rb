class MessagesController < ApplicationController
before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @new_messages = @messages.where("id > ?", params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group)}
        format.json
      end
    else
      redirect_to group_messages_path(@group)
    end
  end

  def destroy
    @group.messages.destroy_all
    redirect_to group_messages_path(@group)
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end

