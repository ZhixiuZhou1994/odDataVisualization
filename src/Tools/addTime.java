
package Tools;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import Tools.*;



public class addTime {
	public static String addDateMinut(String day, int x)//���ص����ַ����͵�ʱ�䣬�����
	//��String day, int x
	{
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");// 24Сʱ��
		//�����������ʽҲ������ HH:mm:ss����HH:mm�ȵȣ�������ģ�����������������ʱ��Ҫ������ı�
		//��day��ʽһ��
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
		cal.add(Calendar.MINUTE, x);// 24Сʱ��
		date = cal.getTime();

		cal = null;
		return format.format(date);

	}


}
