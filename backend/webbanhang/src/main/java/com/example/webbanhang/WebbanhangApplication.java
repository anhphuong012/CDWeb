package com.example.webbanhang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.core.annotation.Order;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.MultipartFilter;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@SpringBootApplication
public class WebbanhangApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebbanhangApplication.class, args);
	}
	
	@Bean
	public Cloudinary cloudinary() {
		Cloudinary cloud = new Cloudinary(ObjectUtils.asMap("cloud_name","dp4aw7qok","api_key","616311726644332","api_secret","2R-bjOYHlVz--cxtgOhf2-5tQ8s","secure",true));
		return cloud;
	}
//	@Bean
//	public MultipartResolver multipartResolver() {
//		return new StandardServletMultipartResolver();
//	}


}
