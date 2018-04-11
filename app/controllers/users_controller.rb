class UsersController < ApplicationController

def index
   # @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
   # respond_to do |format|
   #   format.html
   #   format.json
   redirect_to root_path
end
# 2. ルーティングなどAPI側の準備をする
# ユーザーの検索を行うためのルーティングもアクションもまだ用意されていません。
# そのため、初めにルーティングを設定しましょう。
# ルーティングは、7つのアクションに従って作成するべきなので、今回はusers#indexを使うためのルーティングを設定してください。
# users#index

# ルーティングの次は、コントローラを編集しましょう。
# アクションを定義し、非同期で通信されたユーザーを検索して一致するユーザーを取得してください。
# ユーザーを取得したら、jbuilderを使ってJavaScript側に返しましょう。
# 今回は、複数のユーザーが格納された配列を返すようなjbuilderの記述にする必要があります。

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name,:email)
  end
end
