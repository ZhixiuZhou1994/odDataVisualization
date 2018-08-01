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

public class GetAllDJH extends HttpServlet implements Servlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		List<List<GPSPoint>> Atrajectory=new ArrayList<List<GPSPoint>>();
		Atrajectory=ProcessJson.getAllTrajectory();
		JSONArray AllD= new JSONArray();
		for(List<GPSPoint> trajectory : Atrajectory){
			int j=trajectory.size();
			double lat=trajectory.get(j-1).getPointLat();
			double lng=trajectory.get(j-1).getPointLng();
			double[] lnglat = new double[]{lng, lat};
			lnglat=GPSConverter.gcj_encrypt(lnglat);
			AllD.put(lnglat);
		}
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(AllD);
		System.out.println(AllD);
	}

}
