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

import Tools.ProcessJson;

public class GetAllOJH extends HttpServlet implements Servlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("进入成功");
		request.setCharacterEncoding("UTF-8");
		List<List<GPSPoint>> Atrajectory=new ArrayList<List<GPSPoint>>();
		Atrajectory=ProcessJson.getAllTrajectory();
		JSONArray AllO = new JSONArray();
		for(List<GPSPoint> trajectory : Atrajectory){
			double lat=trajectory.get(0).getPointLat();
			double lng=trajectory.get(0).getPointLng();
			double[] lnglat = new double[]{lng, lat};
			lnglat=GPSConverter.gcj_encrypt(lnglat);
			AllO.put(lnglat);
		}
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(AllO);
		System.out.println(AllO);
	}

}
