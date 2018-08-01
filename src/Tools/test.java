package Tools;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
//import java.util.Calendar;

public class test {
public static void main(String[] args) throws Exception { 
	
	String day="12:20:56";
	int x=15;
    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");// 24小时制  
//引号里面个格式也可以是 HH:mm:ss或者HH:mm等等，很随意的，不过在主函数调用时，要和输入的变
//量day格式一致
    Date date = null;   
    date = format.parse(day);   
       
      
          
   
    Calendar cal = Calendar.getInstance();   
    cal.setTime(date);   
    cal.add(Calendar.MINUTE, x);// 24小时制   
    date = cal.getTime();   
    
    cal = null;   
    System.out.println(format.format(date));   

}

}
