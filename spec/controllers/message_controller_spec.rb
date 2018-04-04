require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) { create(:user)}
  #userをcreateし、let内に格納

  describe '#index' do
    before do
      login user
      #controller_macros.rb内のlogin_userメソッドを呼び出し
    end

  end
end

