package Tools;

import java.io.File;

public class Variables {
	public final static String sep = File.separator;
	public final static String linesep = System.getProperty("line.separator");
	public final static String tmpdir = System.getProperty("java.io.tmpdir");
	public final static String osmFile = "ArcMap_2015_06_12_Verification_2015_10_25.xml";
	public final static String osmRelation = "ArcMap_2015_06_12_Verification_2015_10_25_relation.json";
	public final static double EARTH_RADIUS = 6371004;
	public final static double POINTMBR_LENGTH = 800;
	public final static double SUBROADNET = 100;
	public static double[] LEFTDOWN = {0, 0};
	public static int MULTI_THREAD = 0;
}