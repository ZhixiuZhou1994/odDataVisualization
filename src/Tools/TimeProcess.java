package Tools;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeProcess {
	
	 public static boolean compareDate(String time1,String time2)
	    {  

	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); 
	        try {
		        Date a=sdf.parse(time1);  
		        Date b=sdf.parse(time2);  
		        
		        if(a.before(b))  
		            return true;  
		        else  
		            return false;
	        } catch(Exception e) {
	        	e.printStackTrace();
	        }
			return false;
	        
	    } 
	 public static boolean compareTime(String time1,String time2)
	    {  

	        SimpleDateFormat sdf=new SimpleDateFormat("hh:mm:ss"); 
	        try {
		        Date a=sdf.parse(time1);  
		        Date b=sdf.parse(time2);  
		        
		        if(a.before(b))  
		            return true;  
		        else  
		            return false;
	        } catch(Exception e) {
	        	e.printStackTrace();
	        }
			return false;
	        
	    } 
	 public static int getDateDiff(String time) 
	    {
	        try{
	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	        String str=time;
	        Date dt=sdf.parse(str); 
	        Calendar rightNow = Calendar.getInstance();
	        rightNow.setTime(dt);
	       
	        int num=rightNow.get(Calendar.DAY_OF_YEAR);
	        return num;
	        
	        }catch (Exception ex) {   
	            ex.printStackTrace(); 
	         
	        }   
	        return 0;
	    } 
	 public static int getTimeDiff(String time)
	    {
		 int minutes=Integer.valueOf(time.split(":")[0]) * 60
			+ Integer.valueOf(time.split(":")[1]);
		 return minutes;
	    } 

}
