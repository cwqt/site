require 'active_support/time'

module Jekyll
  module Desamber
    def formatted_time(time)
      time = Time.parse(time)
      year_start = time.beginning_of_year - 1.day
      day_start = time.beginning_of_day
      since_midnight = time - day_start
      clock = sprintf("%.3f", ((since_midnight / 864) * 10)).rjust(7, "0")
      clock = clock.to_s.split('.')

      diff = (time - year_start) + (((year_start.utc_offset / 1.minute) - (time.utc_offset / 1.minute)) * 60 * 1000)
      doty = (diff / 86400).floor
      year = time.strftime('%y')
      month = (97 + (((doty-1)/364.0) * 26).floor).chr.upcase
      month = ((doty == 365) || (doty == 366)) ? '+' : month
      day = (doty % 14)
      day = (day < 10) ? "0#{day}" : day
      day = (day == "00") ? "14" : day
      day = (doty == 365) ? "01" : (doty == 366 ? "02" : day)

      "#{year}#{month}#{day} #{clock[0]}:#{clock[1]}"
    end
  end
end


Liquid::Template.register_filter(Jekyll::Desamber)

