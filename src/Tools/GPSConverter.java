package Tools;

public class GPSConverter {
	/**
	 * @param lnglat
	 * @return WGS-84 to GCJ-02
	 */
	public static double[] gcj_encrypt(double[] lnglat) {
		double[] d = delta(lnglat);
		return new double[]{lnglat[0] + d[0], lnglat[1] + d[1]};
	}
	/**
	 * @param lnglat
	 * @return GCJ-02 to WGS-84
	 */
	public static double[] gcj_decrypt(double[] lnglat) {
		double[] d = delta(lnglat);
		return new double[]{lnglat[0] - d[0], lnglat[1] - d[1]};
	}
	private static double[] delta(double[] lnglat) {
//		Krasovsky 1940
//		卫星椭球坐标投影到平面地图坐标系的投影因子
		double a = 6378245.0;
//		椭球的偏心率
		double ee = 0.00669342162296594323;
		double[] args = new double[]{lnglat[0] - 105.0, lnglat[1] - 35.0};
		double dLng = transformLng(args);
		double dLat = transformLat(args);
		double radLat = lnglat[1] / 180.0 * Math.PI;
		double magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		double sqrtMagic = Math.sqrt(magic);
		dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
		return new double[]{dLng, dLat};
	}
	private static double transformLng(double[] lnglat) {
		double ret = 300.0 + lnglat[0] + 2.0 * lnglat[1] + 0.1 * lnglat[0] * lnglat[0] + 0.1 * lnglat[0] * lnglat[1] + 0.1 * Math.sqrt(Math.abs(lnglat[0]));
		ret += (20.0 * Math.sin(6.0 * lnglat[0] * Math.PI) + 20.0 * Math.sin(2.0 * lnglat[0] * Math.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lnglat[0] * Math.PI) + 40.0 * Math.sin(lnglat[0] / 3.0 * Math.PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(lnglat[0] / 12.0 * Math.PI) + 300.0 * Math.sin(lnglat[0] / 30.0 * Math.PI)) * 2.0 / 3.0;
		return ret;
	}
	private static double transformLat(double[] lnglat) {
		double ret = -100.0 + 2.0 * lnglat[0] + 3.0 * lnglat[1] + 0.2 * lnglat[1] * lnglat[1] + 0.1 * lnglat[0] * lnglat[1] + 0.2 * Math.sqrt(Math.abs(lnglat[0]));
		ret += (20.0 * Math.sin(6.0 * lnglat[0] * Math.PI) + 20.0 * Math.sin(2.0 * lnglat[0] * Math.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lnglat[1] * Math.PI) + 40.0 * Math.sin(lnglat[1] / 3.0 * Math.PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(lnglat[1] / 12.0 * Math.PI) + 320 * Math.sin(lnglat[1] * Math.PI / 30.0)) * 2.0 / 3.0;
		return ret;
	}
}
