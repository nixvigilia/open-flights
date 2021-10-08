class Airline < ApplicationRecord
    has_many :reviews
    # callback before storing to database
    before_create :slugify

    def slugify
        # slug is a column name
        self.slug = name.parameterize
    end

    def avg_score
        return 0 unless reviews.count.positive?
        # Prints the int as float to_f
        reviews.average(:score).round(2).to_f
    end
end
