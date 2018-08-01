package Tools;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import Tools.*;




public class GetO extends HttpServlet implements Servlet{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		
		double lngMin = Double.valueOf(request.getParameter("lngMin"));
		double lngMax = Double.valueOf(request.getParameter("lngMax"));
		double latMin = Double.valueOf(request.getParameter("latMin"));
		double latMax = Double.valueOf(request.getParameter("latMax"));
		
		String Dstart=request.getParameter("dateStart");
		String Dend=request.getParameter("dateEnd");
		String Tstart=request.getParameter("timeStart");
		String Tend=request.getParameter("timeEnd");
		System.out.println(Tend);
		
		List<List<GPSPoint>> Atrajectory=new ArrayList<>();
		Atrajectory=ProcessJson.getAllTrajectory();
		JSONArray Array = new JSONArray();
		
		int dateStart =TimeProcess.getDateDiff(Dstart);
		int dateEnd =TimeProcess.getDateDiff(Dend) ;
		//System.out.println(dateStart);
		//System.out.println(dateEnd);
		int timeStart=TimeProcess.getTimeDiff(Tstart);
		System.out.println(timeStart);
		int timeEnd=TimeProcess.getTimeDiff(Tend);
		
		
		for (List<GPSPoint> trajectory : Atrajectory) {
			double Olat=trajectory.get(0).getPointLat();
			double Olng=trajectory.get(0).getPointLng();
			String taxitime=trajectory.get(0).getPointTaxiTime();
			String  Date=taxitime.split(" ")[0];
			String  Time=taxitime.split(" ")[1];
			int Datedif=TimeProcess.getDateDiff(Date);
			int Timedif=TimeProcess.getTimeDiff(Time);

			boolean dateCompare, timeCompare;
			dateCompare = (Datedif >= dateStart && Datedif <= dateEnd) ? true : false;
			timeCompare = (Timedif >= timeStart && Timedif <= timeEnd) ? true : false;
			if((Olat>=latMin && Olat<=latMax)&&(Olng>=lngMin && Olng<=lngMax && dateCompare && timeCompare)){
				JSONObject traj = new JSONObject();
				GPSPoint oPoint = trajectory.get(0);
				GPSPoint dPoint = trajectory.get(trajectory.size() - 1);
				traj.put("Otime", oPoint.getPointTaxiTime());
				traj.put("Dtime", dPoint.getPointTaxiTime());
				double[] oLngLat = new double[]{oPoint.getPointLng(), oPoint.getPointLat()};
				double[] dLngLat = new double[]{dPoint.getPointLng(), dPoint.getPointLat()};
				oLngLat = GPSConverter.gcj_encrypt(oLngLat);
				dLngLat = GPSConverter.gcj_encrypt(dLngLat);
				traj.put("O", oLngLat);
				traj.put("D", dLngLat);
				for (GPSPoint point : trajectory) {
					double lat=point.getPointLat();
					double lng=point.getPointLng();
					double[] lnglat = new double[]{lng, lat};
					lnglat=GPSConverter.gcj_encrypt(lnglat);
        			traj.accumulate("W", lnglat);
				}
				Array.put(traj);
			}
	    }
		
		int length=Array.length();
		System.out.println("guiji"+length);

		String current=Tstart;
		int[] timelineArray = new int[(timeEnd - timeStart) / 15 + ((timeEnd - timeStart) % 15 == 0 ? 0 : 1)];
		//System.out.println(timelineArray.length);
		JSONArray timeline = new JSONArray(); 
		for (int j = 0; j < length; j++) {
			String time=Array.getJSONObject(j).getString("Otime");
			String  Date=time.split(" ")[0];
			String  Time=time.split(" ")[1];
			//System.out.println(Time);
			int timeInt = TimeProcess.getTimeDiff(Time);
			if (timeInt == timeEnd) {
				timelineArray[timelineArray.length - 1] += 1;
			} else {
				timelineArray[(timeInt - timeStart) / 15] += 1;
			}
		}
		for (int j = 0; j < timelineArray.length; j++) {
			JSONObject dd = new JSONObject();
			dd.put("date", current);
			dd.put("count", timelineArray[j]);
			timeline.put(dd);
			current=addTime.addDateMinut(current, 15);
		}
		JSONObject Tline=new JSONObject();
		Tline.put("timeline", timeline);
		Array.put(Tline);
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(Array);
		//System.out.println(Array);
	}
	
}


