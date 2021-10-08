module Api
    module V1
        class ReviewsController < ApplicationController

            # temporary fix for invalid authenticity token    
            protect_from_forgery with: :null_session
            
            def create
                # review = Review.new(review_params)
                # below is for airlines with existing reviews || reviews belongs to airline
                review = airline.reviews.new(review_params)

                if review.save
                    render json: ReviewSerializer.new(review).serializable_hash
                else
                    render json: {error: review.errors.messages}, status: 422
                end
            end

            def destroy
                review = Review.find(params[:id])

                if review.destroy
                    head :no_content
                else
                    render json: {error: review.errors.messages}, status: 422
                end
            end

            private

            def airline
                @airline ||= Airline.find(params[:airline_id])
            end
            
            def review_params
                params.require(:review).permit(:title, :description, :score, :airline_id)
            end

        end
    end
end