package Tools;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
//import java.util.Calendar;

public class test {
public static void main(String[] args) throws Exception { 
	
	String day="12:20:56";
	int x=15;
    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");// 24Сʱ��  
//�����������ʽҲ������ HH:mm:ss����HH:mm�ȵȣ�������ģ�����������������ʱ��Ҫ������ı�
//��day��ʽһ��
    Date date = null;   
    date = format.parse(day);   
       
      
          
   
    Calendar cal = Calendar.getInstance();   
    cal.setTime(date);   
    cal.add(Calendar.MINUTE, x);// 24Сʱ��   
    date = cal.getTime();   
    
    cal = null;   
    System.out.println(format.format(date));   

}

}
