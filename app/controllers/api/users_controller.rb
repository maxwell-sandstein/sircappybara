class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors, status: 422
		end
	end

	def show
    @user = User.find_by_id(params[:id]);

	  unless @user.nil?
      render "api/users/show_profile"
	  else
      render json: {message: "User with said Id does not exists"},
			status: 422
	  end
	end

	def update
    @user = User.find_by_id(params[:id]);
    updating_params = user_params

		type_convert_date(updating_params)

		if @user.update(updating_params)
      render "api/users/show"
		else
			render json: {message: "Failed to update"},
		  status: 422
		end
	end

	private

	def type_convert_date(updating_params)
		 date = updating_params[:birthday]
     unless date.nil?
        newDate = calendar_date_to_date_type(date)
				updating_params[:birthday] = newDate
		 end
	end

	def calendar_date_to_date_type(calendar_date)
    calendar_arr = calendar_date.split('-')
		date_type_arr = [];
    3.times do |i|
       date_type_arr[2 - i] = calendar_arr[i]
		end

    date_type_arr[0] = pad_zero(date_type_arr[0])
    date_type_arr[1] = pad_zero(date_type_arr[1])

		date_type_arr.join('/')
	end

	def pad_zero(numStr)
    numStr = "#{0.to_s}#{numStr}" if numStr.length == 1

		numStr
	end

	def user_params
		params.require(:user).permit(:username, :password, :email, :birthday, :breed, :gender)
	end

end
