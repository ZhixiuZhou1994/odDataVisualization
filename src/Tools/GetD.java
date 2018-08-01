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

public class GetD extends HttpServlet implements Servlet{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		double lngMin = Double.valueOf(request.getParameter("lngMin"));
		double lngMax = Double.valueOf(request.getParameter("lngMax"));
		double latMin = Double.valueOf(request.getParameter("latMin"));
		double latMax = Double.valueOf(request.getParameter("latMax"));
		//int d=0;
		double[] lnglatMin = new double[]{lngMin, latMin};
		double[] lnglatMax = new double[]{lngMax, latMax};
		List<List<GPSPoint>> Atrajectory=new ArrayList<List<GPSPoint>>();
		Atrajectory=ProcessJson.getAllTrajectory();
		JSONArray OArray = new JSONArray();
		for(int i = 0; i <Atrajectory.size(); i++){
			int j=Atrajectory.get(i).size();
			double lat=Atrajectory.get(i).get(j-1).getPointLat();
			double lng=Atrajectory.get(i).get(j-1).getPointLng();
			double[] lnglat = new double[]{lng, lat};
			if((lat>=latMin && lat<=latMax)&&(lng>=lngMin && lng<=lngMax)){
				//d++;
				lnglat=(new GPSConverter()).gcj_encrypt(lnglat);
				OArray.put(lnglat);
			}
			
	    }
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(OArray);
		System.out.println(OArray);
	}


}
