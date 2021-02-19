package com.pojo.details;

import com.pojo.IdcsDetail;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class IdcsDetails {
	static List<IdcsDetail> idcsdeatils = new ArrayList<>();

	public static void fillAuthHistoryList() {

		if (idcsdeatils.isEmpty()) {
			idcsdeatils
					.add(new IdcsDetail("Rajat", "1230000001", "rajat@gmail.com", "7000000081", "MALE", "AGRA", "20"));
			idcsdeatils.add(
					new IdcsDetail("Saurabh", "1230000002", "saurabh@gmail.com", "7000000082", "MALE", "KANPUR", "23"));
			idcsdeatils.add(
					new IdcsDetail("Munesh", "1230000003", "munesh@gmail.com", "7000000083", "FEMALE", "DELHI", "26"));
			idcsdeatils
					.add(new IdcsDetail("Anil", "1230000004", "anil@gmail.com", "7000000084", "MALE", "NOIDA", "22"));
		}
	}

	public static String getData(String id) {
		fillAuthHistoryList();
		JSONArray list = new JSONArray();
		for (IdcsDetail entry : idcsdeatils) {
			String key = entry.getId();

			if (key.equals(id)) {
				String email = entry.getEmail();
				String number = entry.getNumber();
				JSONObject obj = new JSONObject();
				obj.put("Name", entry.getName());
				obj.put("Idcs", key);
				obj.put("Email", email);
				obj.put("Number", number);
				obj.put("Sex", entry.getSex());
				obj.put("Region", entry.getRegion());
				obj.put("Age", entry.getAge());
				list.add(obj);

			}
		}
		return list.toJSONString();
	}
}
