require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) { create(:user)}
  let(:group) { create(:group) }
  #userをcreateし、let内に格納

  describe '#index' do
    context 'log-in' do
      before do
        login user
        #controller_macros.rb内のlogin_userメソッドを呼び出し
        get :index, params: { group_id: group.id}
      end
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders the :index template' do
        expect(response).to render_template :index
      end

    end

    context 'NOT log-in' do
      before do
        get :index, params: { group_id: group.id}
      end
      it 'redirect_to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end

  end

  describe '#create' do
    let(:params){{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

    context 'log-in' do
      before do
        login user
      end
      context 'suceeds to save' do
        subject{
          post :create, params: params
        }

        it 'counts up message' do
          expect{subject}.to change(Message, :count).by(1)
        end

        it 'redirect_to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'fails to save' do
        let(:invalid_params){{group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil)}}
        subject{
          post :create, params: invalid_params
        }

        it 'does not count up message' do
          expect{subject}.not_to change(Message, :count)
        end
        it 'renders view' do
          subject
          expect(response).to render_template :index
        end

      end
    end

    context 'not log-in' do
      it 'redirect_to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end

