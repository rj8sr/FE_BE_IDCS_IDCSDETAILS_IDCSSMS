package com.pdf.generator;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.liferay.portal.util.PrefsPropsUtil;

import java.io.FileOutputStream;

public class PdfGenerator {
	public static final String FILE_PATH = PrefsPropsUtil.getString("idcs-pdf-path");

	public static Document pdfGenerator(String idcs) throws Exception {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(FILE_PATH+"\\IDCS.pdf"));
		document.open();
		document.add(new Paragraph("IDCS:" + idcs));
		document.close();
		writer.close();
		return document;

	}

}
