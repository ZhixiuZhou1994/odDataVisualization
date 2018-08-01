package Tools;

import java.util.ArrayList;
import java.util.List;

import Tools.Difference;
import Tools.DistanceByLatLng;
import Tools.Variables;

public class GPSPoint implements Comparable<Object> {
	private String pointString; //原始GPS字符串
	private String pointID; //GPS点ID
	private String carID; //车辆ID
	private String carName; //车牌
	private double pointLng; //经度
	private double pointLat; //纬度
	private double pointLngMetre; //经度转换成米
	private double pointLatMetre; //纬度转换成米
	private double pointLngDUP; //另外一个经度
	private double pointLatDUP; //另外一个纬度
	private double pointLngMatch; //匹配后的经度
	private double pointLatMatch; //匹配后的纬度
	private double pointSpeed; //瞬时速度
	private double pointCalcSpeed; //计算出来的速度
	private double pointAngle; //车身角度
	private String carFlag; //载客标志
	private String pointServerTime; //服务器存储数据时间
	private String pointTaxiTime; //车辆发送数据时间
	private String matchInfo; //匹配路段
	private List<String> candidateInfo; //所有候选路段
	private String wayID; //匹配道路ID
	public GPSPoint(String pointString) {
		this.pointString = pointString;
		pointID = pointString.split(",")[0];
		carID = pointString.split(",")[1];
		carName = pointString.split(",")[2];
		pointLng = Double.valueOf(pointString.split(",")[3]);
		pointLat = Double.valueOf(pointString.split(",")[4]);
		pointLngMetre = DistanceByLatLng.distance(Variables.LEFTDOWN[0], pointLng, Variables.LEFTDOWN[0], Variables.LEFTDOWN[1]);
		pointLatMetre = DistanceByLatLng.distance(pointLat, Variables.LEFTDOWN[1], Variables.LEFTDOWN[0], Variables.LEFTDOWN[1]);
		pointLngDUP = Double.valueOf(pointString.split(",")[5]);
		pointLatDUP = Double.valueOf(pointString.split(",")[6]);
		pointLngMatch = pointLng;
		pointLatMatch = pointLat;
		pointSpeed = Double.valueOf(pointString.split(",")[7]);
		pointCalcSpeed = 0.0;
		pointAngle = Double.valueOf(pointString.split(",")[8]);
		carFlag = pointString.split(",")[9];
		pointServerTime = pointString.split(",")[11];
		pointTaxiTime = pointString.split(",")[12];
		matchInfo = new String();
		candidateInfo = new ArrayList<String>();
		wayID = new String();
	}
	public GPSPoint(GPSPoint gp) {
		this.pointString = gp.pointString;
		this.pointID = gp.pointID;
		this.carID = gp.carID;
		this.carName = gp.carName;
		this.pointLng = gp.pointLng;
		this.pointLat = gp.pointLat;
		this.pointLngMetre = gp.pointLngMetre;
		this.pointLatMetre = gp.pointLatMetre;
		this.pointLngDUP = gp.pointLngDUP;
		this.pointLatDUP = gp.pointLatDUP;
		this.pointLngMatch = gp.pointLngMatch;
		this.pointLatMatch = gp.pointLatMatch;
		this.pointSpeed = gp.pointSpeed;
		this.pointCalcSpeed = gp.pointCalcSpeed;
		this.pointAngle = gp.pointAngle;
		this.carFlag = gp.carFlag;
		this.pointServerTime = gp.pointServerTime;
		this.pointTaxiTime = gp.pointTaxiTime;
		this.matchInfo = gp.matchInfo;
		this.candidateInfo = new ArrayList<String>(gp.candidateInfo);
		this.wayID = gp.wayID;
	}
	public int hashCode() {
		return pointString.hashCode();
	}
	public boolean equals(Object obj) {
		GPSPoint gp = (GPSPoint) obj;
		if(!pointString.equals(gp.pointString)) return false;
		return true;
	}
	public String toString() {
		return pointString;
	}
	public String getPointID() {
		return pointID;
	}
	public String getCarID() {
		return carID;
	}
	public String getCarName() {
		return carName;
	}
	public double getPointLng() {
		return pointLng;
	}
	public double getPointLat() {
		return pointLat;
	}
	public double getPointLngMetre() {
		return pointLngMetre;
	}
	public double getPointLatMetre() {
		return pointLatMetre;
	}
	public double getPointLngDUP() {
		return pointLngDUP;
	}
	public double getPointLatDUP() {
		return pointLatDUP;
	}
	public double getPointLngMatch() {
		return pointLngMatch;
	}
	public double getPointLatMatch() {
		return pointLatMatch;
	}
	public void setPointLng(double pointLngMatch) {
		this.pointLngMatch = pointLngMatch;
	}
	public void setPointLat(double pointLatMatch) {
		this.pointLatMatch = pointLatMatch;
	}
	public double getPointSpeed() {
		return pointSpeed;
	}
	public double getPointCalcSpeed() {
		return pointCalcSpeed;
	}
	public void setPointCalcSpeed(double pointCalcSpeed) {
		this.pointCalcSpeed = pointCalcSpeed;
	}
	public double getPointAngle() {
		return pointAngle;
	}
	public String getCarFlag() {
		return carFlag;
	}
	public String getPointServerTime() {
		return pointServerTime;
	}
	public String getPointTaxiTime() {
		return pointTaxiTime;
	}
	public String getMatchInfo() {
		return matchInfo;
	}
	public void setMatchInfo(String matchInfo) {
		this.matchInfo = matchInfo;
	}
	public List<String> getCandidateInfo() {
		return candidateInfo;
	}
	public String getCandidateInfo2StringJoinComma() {
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < candidateInfo.size(); i++) {
			sb.append(candidateInfo.get(i));
			if(i < candidateInfo.size() - 1) sb.append(",");
		}
		return sb.toString();
	}
	public String getWayID() {
		return wayID;
	}
	public void setWayID(String wayID) {
		this.wayID = wayID;
	}
	public int compareTo(Object obj) {
		String objTime = ((GPSPoint) obj).pointServerTime;
		long timeDiff = Difference.computeTime(pointServerTime, objTime);
		if(timeDiff > 0) {
			return -1;
		} else if(timeDiff < 0) {
			return 1;
		} else {
			return 0;
		}
	}
}