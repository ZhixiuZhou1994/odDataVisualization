package Tools;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Difference {
	public static long getDayFromDate(String date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		long day = 0;
		try {
			Date dateTime = df.parse(date);
			day = dateTime.getTime() / 1000 / 60 / 60 / 24;
		} catch (Exception e) { }
		return day;
	}
	public static long getSecFromTime(String time) {
		long hour = Long.valueOf(time.split(":")[0]);
		long min = Long.valueOf(time.split(":")[1]);
		long sec = 0;
		try {
			sec = Long.valueOf(time.split(":")[2]);
		} catch (Exception e) { }
		return hour * 3600 + min * 60 + sec;
	}
	public static long getSecFromFullTime(String fulltime) {
		long day = getDayFromDate(fulltime.split(" ")[0]);
		long sec = getSecFromTime(fulltime.split(" ")[1]);
		return day * 24 * 60 * 60 + sec;
	}
	public static long computeTime(String time0, String time1) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime startTime = LocalDateTime.parse(time0, formatter);
		LocalDateTime endTime = LocalDateTime.parse(time1, formatter);
		Duration duration = Duration.between(startTime, endTime);
		return duration.toMillis() / 1000;
	}
}
