package Tools;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;
import java.nio.CharBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;


public class RaedJson { 
	public static String streamReadFile(String path) throws IOException {
		StringBuilder sb = new StringBuilder();
		String line = new String();
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), "utf-8"));
		while((line = br.readLine()) != null) {
			sb.append(line);
		}
		br.close();
		return sb.toString();
	}
	public static void streamWriteFile(String path, String data, String charset) throws IOException {
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), charset));
		bw.write(data);
		bw.close();
	}

}
