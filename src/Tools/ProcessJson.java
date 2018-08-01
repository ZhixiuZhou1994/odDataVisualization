package Tools;


import java.io.File;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import Tools.*;


public class ProcessJson {


	public static List<List<GPSPoint>> getAllTrajectory() throws IOException {
		JSONObject pointList=new JSONObject();
		String dataDIR="F:"+Variables.sep+"odDataVisualization"+Variables.sep+"data"+Variables.sep;



		System.out.println(dataDIR);
		File dataFile = new File(dataDIR);

		List<List<GPSPoint>> Atrajectory=new ArrayList<List<GPSPoint>>();
		for(int a = 0; a < dataFile.list().length; a++)//����ÿ���ļ�
		{
			System.out.println("读取文件");
			RaedJson RJ=new RaedJson();
			String JsonContext=RJ.streamReadFile(dataDIR+dataFile.list()[a]);//��ȡһ��json�ļ�
			JSONArray jsonArray = new JSONArray(JsonContext);//�����ַ���������json����
        	for(int i = 0; i < jsonArray.length(); i++) //��ȡһ��json����
        		{
        			List<GPSPoint> trajectory = new ArrayList<GPSPoint>();
        			if(jsonArray.getJSONObject(i).getInt("carFlag")==1)
        			{
        				JSONArray pointArray = jsonArray.getJSONObject(i).getJSONArray("list");

        				for(int p = 0; p < pointArray.length(); p++)
        				{
        					String pointString = pointArray.get(p).toString();
        					GPSPoint point = new GPSPoint(pointString);
							//trajectory.add(point);
	        			}
        				//System.out.println(trajectory);
        				//Atrajectory.add(trajectory);
	        		}
        			if(jsonArray.getJSONObject(i).getInt("carFlag")==1)
        			{
        				Atrajectory.add(trajectory);
        				}


        		}

		}
		System.out.println(Atrajectory);
		return(Atrajectory);

	}


}
