package Tools;

public class DistanceByLatLng {

	public static double distance(double latA, double lngA, double latB, double lngB) {
//		Lat Lng --> Meter
		double latAx = latA * Math.PI / 180;
		double lngAx = lngA * Math.PI / 180;
		double latBx = latB * Math.PI / 180;
		double lngBx = lngB * Math.PI / 180;
		double add1 = Math.sin(latAx) * Math.sin(latBx);
		double add2 = Math.cos(latAx) * Math.cos(latBx) * Math.cos((lngAx - lngBx));
		return Variables.EARTH_RADIUS * Math.acos(add1 + add2);
	}

}
