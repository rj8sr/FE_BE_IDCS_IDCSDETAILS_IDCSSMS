package com.pojo;

public class IdcsDetail {
	private String id;
	private String email;
	private String number;
	private String sex;
	private String region;
	private String age;
private String name;
	public IdcsDetail(String name,String id, String email, String number, String sex, String region, String age) {
		super();
		this.name=name;
		this.id = id;
		this.email = email;
		this.number = number;
		this.sex = sex;
		this.region = region;
		this.age = age;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
