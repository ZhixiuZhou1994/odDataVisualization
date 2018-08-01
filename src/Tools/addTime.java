
package Tools;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import Tools.*;



public class addTime {
	public static String addDateMinut(String day, int x)//返回的是字符串型的时间，输入的
	//是String day, int x
	{
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");// 24小时制
		//引号里面个格式也可以是 HH:mm:ss或者HH:mm等等，很随意的，不过在主函数调用时，要和输入的变
		//量day格式一致
		Date date = null;
		try {
			date = format.parse(day);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (date == null)
			return "";

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, x);// 24小时制
		date = cal.getTime();

		cal = null;
		return format.format(date);

	}


}
